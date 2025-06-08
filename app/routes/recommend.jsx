import asai from "../image/asai.png"
import asai3 from "../image/asai3.png"
import "../styles/recommend.css"
const profileItems = [
    "マッチ度:","出身","mbti:","大学","コース","役職","趣味","アピール"
]

export default function Recommend () {
    return(
        <div>
        <h1>あなたにおすすめ</h1>
        <div className="badge-top-pick">
            <img src={asai} alt="asai"></img>
            <div>
                {profileItems.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
        <h2>その他おすすめ</h2>
        <div className="badge-other-pick">
            <img src={asai3} alt="asai3"></img>
            <div>
                {profileItems.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
        </div>
        </div>

    )
}