export default function handler(요청, 응답){
    let a = new Date()
    응답.status(200).json(a)
  } 

  // api/date라고 get 요청이 왔을 때 실행 된다.