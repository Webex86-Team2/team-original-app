const renderStars = (rate) => {
  if (typeof rate !== 'number') return "☆☆☆☆☆";
  const stars = Math.round((rate / 100) * 5);
  return "★".repeat(stars) + "☆".repeat(5 - stars);
};

const OtherPick = ({ user }) => {
  return (
    <div className="badge-top-pick">
      <img src={user.avatarUrl || "/default.png"} alt={user.name} />
      <div>
        <div className="match-rate">
          <span>マッチ度: {user.matchRate || "??"}%</span>
          <span className="match-stars">{renderStars(user.matchRate)}</span>
        </div>
        <h3>名前: {user.name}</h3>
        <h3>出身: {user.hometown}</h3>
        <h3>MBTI: {user.mbti}</h3>
        <h3>大学: {user.university}</h3>
        <h3>コース: {Array.isArray(user.courses) ? user.courses.join("、") : user.courses}</h3>
        <h3>趣味: {Array.isArray(user.hobbies) ? user.hobbies.join("、") : user.hobbies}</h3>
        <h3>アピール: {user.comment}</h3>
      </div>
      <div className="chat-button-area">
        <button className="chat-button">💬 チャットする</button>
      </div>
    </div>
  );
};

export default OtherPick;
