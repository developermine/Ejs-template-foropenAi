function chatStripe (isBot, value, uniqueId) {
    return (
      `
        <div class="wrapper ${isBot && 'bot'}">
          <div class="chat">
            <div class="profile">
              <img 
                src="${isBot ? "/bot.svg" : "/user.svg"}"
                alt="${isBot ? 'bot' : 'user'}"
              />
            </div>
            <div class="message" id=${uniqueId}>${value}</div>
          </div>
        </div>
      `
    )
  }