const Mentor = ({ mentor }) => {
  return (
    <div className="mentor-card">
      <img src={mentor.img} alt={mentor.name} className="mentor-img" />
      <h2>{mentor.name}</h2>
      <p>出身地：{mentor.hometown}</p>
      <p>MBTI：{mentor.mbti}</p>
      <p>大学：{mentor.university}</p>
      <p>コース：{mentor.course} コース</p>
      <p>役職：{mentor.role}</p>
      <p>年齢：{mentor.age}歳</p>
      <p>趣味：</p>
      <ul>
        {mentor.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
};

export default Mentor;
