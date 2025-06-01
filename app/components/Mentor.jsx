const Mentor = ({ mentor }) => {
  return (
    <div className="asai">
      <div>名前：{mentor.name}</div>
      <img src={mentor.img} alt="asai" />
      <div>出身地：{mentor.hometown}</div>
      <div>MBTI：{mentor.mbti}</div>
      <div>大学：{mentor.university}</div>

      <div>コース：{mentor.course}コース</div>
      <div>役職：{mentor.role}</div>
      <div>年齢：{mentor.age}歳</div>
      <div>
        趣味：
        <div>
          {mentor.hobbies.map((hobby, index) => (
            <div key={index}>{hobby}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentor;
