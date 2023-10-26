import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { 
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
  CapacitorSQLitePlugin,
  capSQLiteUpgradeOptions
} from '@capacitor-community/sqlite';

@Injectable()

export class SQLiteService {
  sqliteConnection!: SQLiteConnection;
  isService: boolean = false;
  platform!: string;
  sqlitePlugin!: CapacitorSQLitePlugin;
  native: boolean = false;
  
  constructor() { }

  async inicializarPlugin(): Promise<boolean> {
    this.platform = Capacitor.getPlatform();
    if(this.platform === 'ios' || this.platform === 'android') this.native = true;
    this.sqlitePlugin = CapacitorSQLite;
    this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
    this.isService = true;
    return true;
  }

  async inicializarAlmacenamientoWeb(): Promise<void> {
    try {
      await this.sqliteConnection.initWebStore();
    } catch(err: any) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`initWebStore: ${err}`);
    }
  }

  async abrirBaseDeDatos(dbName: string, encrypted: boolean, mode: string,
    version: number, readonly: boolean): Promise<SQLiteDBConnection> 
  {
    let db: SQLiteDBConnection;
    const retCC = (await this.sqliteConnection.checkConnectionsConsistency()).result;
    let isConn = (await this.sqliteConnection.isConnection(dbName, readonly)).result;
    if(retCC && isConn) {
      db = await this.sqliteConnection.retrieveConnection(dbName, readonly);
    } else {
      db = await this.sqliteConnection.createConnection(dbName, encrypted, mode, version, readonly);
    }
    await db.open();
    return db;
  }

  async recuperarConexion(dbName: string, readonly: boolean): Promise<SQLiteDBConnection> {
    return await this.sqliteConnection.retrieveConnection(dbName, readonly);
  }

  async cerrarConexion(database:string, readonly?: boolean): Promise<void> {
    const readOnly = readonly ? readonly : false;
    return await this.sqliteConnection.closeConnection(database, readOnly);
  }

  async crearBaseDeDatos(options: capSQLiteUpgradeOptions): Promise<void> {
    return await this.sqlitePlugin.addUpgradeStatement(options);
  }

  async guardarNombreBaseDeDatos() : Promise<void> {
    return await this.sqliteConnection.saveToStore('basedatos');
  }

  async eliminarBaseDeDatos() {
    return this.sqlitePlugin.deleteDatabase({ database: 'basedatos' });
  }
}
