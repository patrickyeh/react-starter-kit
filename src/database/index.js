/**
 * Created by Administrator on 2016/4/11.
 */
import knex from 'knex';
import { databaseUrl } from '../config';
import create_tables from './create_tables';

const db = knex({
    client:'pg',
    connection:databaseUrl,
    searchPath:'public'
});

async function initialize(){
    await create_tables(db);
    return db.select('create_at').from('activity_log').then((rows) => console(rows));
}

export default db;
