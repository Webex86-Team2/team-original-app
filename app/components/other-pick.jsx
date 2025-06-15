
const OtherPick = ({user}) => {
    return(
        <div className="badge-top-pick">
          <img src={user.avatarUrl || "/default.png"} alt={user.name} />
          <div>
            <h3>マッチ度: {user.matchRate || "??"}%</h3>
            <h3>名前: {user.name}</h3>
            <h3>出身: {user.hometown}</h3>
            <h3>MBTI: {user.mbti}</h3>
            <h3>大学: {user.university}</h3>
            <h3>コース: {user.courses}</h3>
            <h3>趣味: {user.hobbies}</h3>
            <h3>アピール: {user.comment}</h3>
          </div>
        </div>
    )
}

export default OtherPick;