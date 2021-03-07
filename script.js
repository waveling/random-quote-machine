const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteButton = document.getElementById('new-quote')

// Get Quote From API
async function getQuote() {
    const apiUrl = 'https://api.quotable.io/random'
    try {
        const response = await fetch(apiUrl)
        const data = await response.json()
        // If author is blank, add 'Unknown'
        if (data.author === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.author
        }
        // Reduce font size for long quotes
        if (data.content.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')   
        }
        quoteText.innerText = data.content
    } catch (error) {
        console.log(error)
    }
}

// Tweet functionality
function tweetQuote() {
    const quote = quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteButton.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

// On Load
getQuote()