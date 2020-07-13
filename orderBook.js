function reconcileOrder(existingBook, incomingOrder) {
  if (existingBook === null) return []
  if (incomingOrder === null) return []

  let Book = []

  if (!existingBook.length || existingBook === undefined) {
    Book.push(incomingOrder)

    return Book
  }
  else if (existingBook.length > 0) {
    for (let i = 0; i < existingBook.length; i++) {
      if (existingBook[i].type === incomingOrder.type) {
        Book.push(existingBook[i])
      }
      else if ((existingBook[i].type === notCond(incomingOrder.type))) {
        if ((existingBook[i].quantity < incomingOrder.quantity) && (existingBook[i].price !== incomingOrder.price)) {
          Book.push(existingBook[i])
          Book.push(incomingOrder)

          return Book
        }
        else if ((existingBook[i].quantity === incomingOrder.quantity)) {
          if (existingBook[i].price < incomingOrder.price) {
            Book.push(existingBook[i])
          }
          else if (existingBook[i].quantity === incomingOrder.quantity) {
            incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
          }
        }
        else if (existingBook[i].quantity !== incomingOrder.quantity) {
          incomingOrder.quantity = incomingOrder.quantity - existingBook[i].quantity
        }
      }
    }

    incomingOrder.type = (incomingOrder.quantity > 0) ? 'sell' : 'buy'
    incomingOrder.quantity = (incomingOrder.quantity < 0) && (incomingOrder.quantity) ? Math.abs(incomingOrder.quantity) : incomingOrder.quantity
    if (incomingOrder.quantity !== 0) Book.push(incomingOrder)

    return Book
  }
}

function notCond(cond) {
  if (cond === 'sell') return 'buy'
  if (cond === 'buy') return 'sell'
}

module.exports = reconcileOrder
