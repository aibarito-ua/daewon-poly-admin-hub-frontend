# poly-admin-hub-frontend

#### build : `npm run build`
#### dev server : `npm run dev`
#### serve : `serve -l PORT -s FILE`

# env -> end-point
## /src/config/index.ts에서 전역 변수로 세팅 후 사용

##### `REACT_APP_HOST_URL` : backend url
##### `REACT_APP_LEVEL_AND_TEXTBOOK_SPEAKING` : get default data - 레벨 및 교재 > speaking
##### `REACT_APP_LEVEL_AND_TEXTBOOK_WRITING` : get default data - 레벨 및 교재 > writing

##### `REACT_APP_ACTIVITY_MANAGEMENT_SPEAKING_IDEA_EXCHANGE` : get default data - activity 관리 > speaking
##### `REACT_APP_ACTIVITY_MANAGEMENT_SPEAKING_STORY_VLOG` : get default data - activity 관리 > speaking
##### `REACT_APP_ACTIVITY_MANAGEMENT_SPEAKING_ROLE_PLAY` : get default data - activity 관리 > speaking

##### `REACT_APP_ACTIVITY_MANAGEMENT_WRITING_SPARK_WRITING` : get default data - activity 관리 > writing
##### `REACT_APP_ACTIVITY_MANAGEMENT_WRITING_SPARK_WRITING_UPDATE` : post - activity 관리 > writing - outline 헤드라인 업데이트

##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_WRITING_FILTER_DATA` : get default all list ( 속도 이슈로 현재는 사용 안함 )
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_GET_ALL_CAMPUS` : get campus list
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_GET_LEVELS_OF_CAMPUS` : get level list by campus
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_GET_STUDENT` : get student by campus/level

##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_GET_DRAFT_BY_STUDENT` : get student's draft data by draft id
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_GET_ADVISOR` : get writing advisor(첨삭) by draft id&student name
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_FEEDBACK_TEMPORARY_SAVE` : feedback temporary save
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_FEEDBACK_SUBMIT` : feedback submit

##### `REACT_APP_LEARNING_RESULT_MANAGEMENT_SPEAKING_FILTER_DATA` : get default all list ( 속도 이슈로 현재는 사용 안함 )
##### `REACT_APP_LEARNING_RESULT_MANAGEMENT_SPEAKING_GET_ALL_CAMPUS` : get campus list
##### `REACT_APP_LEARNING_RESULT_MANAGEMENT_SPEAKING_GET_LEVELS_OF_CAMPUS` : get level list by campus
##### `REACT_APP_LEARNING_RESULT_MANAGEMENT_SPEAKING_GET_STUDENT` : get student by campus/level

##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_GET_REPORT_BY_STUDENT` : get student's report data by level/unit index/student code
##### `REACT_APP_LEARNING_MANAGEMENT_WRITING_SPARK_GET_REPORT_OVERALL_BY_STUDENT` : get student's report overall data by level/student code
##### `REACT_APP_LEARNING_RESULT_MANAGEMENT_WRITING_SPARK_WRITING_GET_REPORTS` : get student's all report data by level/student code


##### `REACT_APP_IS_DEV`, `REACT_APP_IS_DEV_CHECK` : 개발서버와 로컬서버 테스트를 나누기 위한 변수로 사용
##### `REACT_APP_IS_HEAD_COMP` : 현재 사용하는 곳 없음

# admin-web