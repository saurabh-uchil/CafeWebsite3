select users.firstname, users.email, schedules.sday, schedules.start_at, schedules.end_at 
from users 
inner join schedules 
on users.userid = schedules.userid;