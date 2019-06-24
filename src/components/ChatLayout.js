import React from 'react';
import "./ChatLayout.css"

function ChatLayout (props) {  
  
  return (
  <>
    <form className="chat">
        <ul className="chat-log">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque libero perferendis molestias doloribus quaerat impedit, praesentium repellat laboriosam eligendi! Ratione, nemo. Perspiciatis at praesentium natus non atque animi facere, reiciendis laudantium expedita iure quos, cumque dolorum quia id ex nam quas nulla neque consequuntur quisquam voluptates minima, magni ut? Hic quaerat sed recusandae, facilis aut eligendi! Quidem odio tenetur quibusdam, ipsa saepe possimus mollitia error perspiciatis architecto hic velit illum blanditiis dolore omnis quo sequi vitae nihil officia harum earum, corrupti eveniet a. Quod, accusantium quae voluptatibus nobis facere voluptates ad iste fugit ducimus perferendis omnis quas illum veritatis quo eius commodi, culpa eaque obcaecati laborum vel corporis adipisci eos totam delectus. Maiores, eaque sequi. Dolores, soluta, fuga sequi doloremque, iste recusandae distinctio atque iusto reiciendis libero quia harum eum laboriosam a. Beatae quos perferendis vero consequatur. Autem natus quo debitis officia amet commodi ea ut eveniet, mollitia cupiditate magni culpa illo quod nesciunt quaerat? Esse, nemo itaque. Ipsum, asperiores voluptatem cum perferendis in delectus neque libero hic sed officiis dolore doloremque alias unde velit officia maiores, itaque tempore, recusandae a blanditiis aliquam? Exercitationem nobis provident expedita sapiente maxime non, recusandae minus corrupti deleniti! 
        </ul>
        <input type="text" className="chat-input"></input>
        <button className="chat-btn">Отправить</button>
    </form>
    <ul className="user-list">
        <span className="user-list__title">Сейчас в сети:</span>
        <li>Участник 1</li>
    </ul>
  </>
  );
}

export default ChatLayout;