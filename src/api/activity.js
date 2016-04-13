/**
 * Created by Administrator on 2016/4/11.
 */
import { Router } from 'express';
import db from '../database/index';

const router = new Router();

//list all activity
router.get('/list', async(req,res,next) =>{
  db.select('*').from('activity').on('query',function(data){
    console.log(data);
  })
  .on('query-error',function(error,obj){
      console.log(error);
    }).catch(function(error){
      console.log(error);
    }).then(function(rows){
      res.json({'activity':rows[0]});
    })
  ;
});

//get specified activity info by giving activity id
router.get('/info',async(req,res,next) => {
  if(req.query.activity_id){
    db.select('*').from('activity').where({'id':req.query.activity_id}).then(function(rows){
      res.json(rows[0]);
    });
  }else{
    res.json({'res':'error'});
  }

});

//for send log to server
router.post('/send_record',async(req,res,next) =>{
    if(req.body.post_json){
      var post_obj = JSON.parse(req.body.post_json);
      db('activity_log').insert({user_uuid:post_obj.user_id,
        activity_id:post_obj.activity_id,
        log_at:post_obj.log_at,
        loc_data:JSON.stringify(post_obj.loc_data),
        sensor_data:JSON.stringify(post_obj.sensor_data)
        }).exec(function(err,id){
        if(err) {
          res.json({'res':'insert_error','msg':err});
          console.log(err);
        }else{
          res.json({'res':'success','id':'id'});
        }
      });
    }else{
      res.json({'res':'error'});
    }
});

//get whole log by activity_id
router.get('/get_whole_log',async(req,res,next) =>{
  if(req.query.activity_id){
    db.select("*").from("activity_log").where({activity_id:req.query.activity_id})
      .then(function(){

      });
  }else{
    res.json({'res':'Error'});
  }
});

//get latest log of all users in the same activity by activity_id
router.get('/get_latest_log',async(req,res,next)=>{
  if(req.query.activity_id){
    db.select("*").from("activity_log").join("user_account").groupBy("user_uuid")
  }
});

export default router;
