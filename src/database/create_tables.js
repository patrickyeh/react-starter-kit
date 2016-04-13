/**
 * Created by Administrator on 2016/4/11.
 */
//import db from 'index';
export default async function create_tables(db) {
    try {

        await db.schema.createTable('activity', (table)=>{
            table.increments('id').primary();
            table.uuid('user_id');
            table.string('activity_name');
        });

        await db.schema.createTable('activity_log',  (table) => {
            table.increments('id').primary();
            table.uuid('user_uuid');
            table.integer('activity_id');
            table.timestamp('log_at');
            table.json('loc_data');
            table.json('sensor_data').nullable;
        });


    } catch (e) {
        console.log('Database already exists', e);
    }
}
