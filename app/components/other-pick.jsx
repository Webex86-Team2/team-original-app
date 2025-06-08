const profileItems = [
    "マッチ度:","出身","mbti:","大学","コース","役職","趣味","アピール"
]

const otherPick = () => {
    return(
        <div>
            {profileItems.map((item, index)=>(
                <div key={index}>
                    <img src={item} alt="asai3"></img>
                    <p>{item}</p>
                </div>
            ))}
        </div>
    )
}

export default otherPick;