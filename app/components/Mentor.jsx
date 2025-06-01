const Mentor = ({ mentor }) => {
  return (
    <div className="asai">
      <div>{mentor.name}</div>
      <img src={mentor.img} alt="asai" />
      <div>コース：{mentor.course}コース</div>
      <div>年齢：{mentor.age}歳</div>
      <div>
        趣味：
        <div>
          {mentor.hobbies.map((hobby, index) => (
            <div key={index}>{hobby}</div>
          ))}
        </div>
      </div>
      <div>好きなタイプ：{mentor.type}</div>
    </div>
  );
};

export default Mentor;
