
// (1) Find all the topics and tasks which are thought in the month of October.

db.topic.aggregate([
  {
    $lookup:{
        from: "task",
        localField: "id",
        foreignField: "topicID",
        as: "topicInfo"
      }    
    },
    {
      $match:{
        month:{$eq:"October"}
      } 
    }        
]).pretty()

// (2) Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020.

db.companyDrives.find({date:{$gte:ISODate("2020-10-15"),$lte:ISODate("2020-10-31")}}).pretty()

// (3) Find all the company drives and students who are appeared for the placement.

db.companyDrives.find({},{_id:0,name:1,studentAppeared:1}).pretty()

// (4) Find the number of problems solved by the user in codekata.

db.user.aggregate([
  {
    $lookup:{
      from:"codekata",
      localField: "id",
      foreignField: "userID",
      as: "probleminfo"
    }
  },
  {
$project:{
  name:1,
  probleminfo:{problemSolved:1}

}
  }
]).pretty()

// (5) Find all the mentors with who has the mentee's count more than 15.

db.mentors.find({menteesCount:{$gt:15}},{_id:0,name:1,menteesCount:1}).pretty()

// (6) Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020.

db.user.find({absentDate:{$gte:"2020-10-15",$lte:"2020-10-31"}}).pretty()
