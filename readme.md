<!--  Post request for schedules -->
curl -d "user_id=1&day=5&start_at=8AM&end_at=12:30PM" -X POST localhost:3000/schedules

<!-- Post request for users -->
curl -d "firstname=Donald&lastname=Duck&email=coincoin@gmail.com&password=daisy" -X POST localhost:3000/users