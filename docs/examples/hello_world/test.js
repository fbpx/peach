const say = require('say')

// Use default system voice and speed
say.speak('Hello world!', 'default', 1, () => {
  console.log('spoken')
})

// Stop the text currently being spoken
// say.stop()

