import { useState } from "react";

const OtherPick = ({items}) => {
    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    return(
        <div className="badge-other-pick">
            <img src={items.picture} alt=""></img>
            <div>
                <h3>マッチ度</h3>
                <h3>名前</h3>
                <h3>出身</h3>
                <h3>MBTI</h3>
                <h3>大学</h3>
                <h3>コース</h3>
                <h3>役職</h3>
                <h3>趣味</h3>
                <h3>アピール</h3>
            </div> 
            <div className="actions">
                <button onClick={() => setLiked(!liked)}>
                    {liked ? "♥" : "♡"} いいね
                </button>
                <button onClick={() => setFavorited(!favorited)}>
                    {favorited ? "★" : "☆"} お気に入り
                </button>
                <button onClick={() => setChatOpen(!chatOpen)}>💬 チャット</button>
            </div>  
        </div>
    )
}

export default OtherPick;