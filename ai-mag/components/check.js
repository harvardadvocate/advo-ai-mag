function checkLanguage(props) {
    const prompt = props.prompt;
    var Filter = require('bad-words');
    var customFilter = new Filter({ placeHolder: '***badword***' });
    const filteredText = customFilter.clean(prompt);
  if (!filteredText.includes('***badword***')) {
    return true
  }
  else {
    alert("Please refrain from using bad words");
    return false
  }

}

function checkAccount(props) {
    const artGenerationsSnapshot = props.artGenerationsSnapshot;
    const literatureGenerationsSnapshot = props.literatureGenerationsSnapshot;
    if (artGenerationsSnapshot.docs.length + literatureGenerationsSnapshot.docs.length < 5) {
        return true
    }
    else {
      alert("You have already used all your credits");
      return false
    }

  }

  export { checkLanguage, checkAccount };