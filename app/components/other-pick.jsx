import { useState } from "react";

const OtherPick = ({items}) => {
    const [liked, setLiked] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    return(
        <div className="badge-other-pick">
            <img src={items.picture} alt=""></img>
            <div>
                {items.profile.map((item, index)=>(
                    <p key={index}>{item}</p>
                ))}
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