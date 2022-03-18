# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: IAN ALEXANDER RODRIGUEZ

Time spent: 17 hours spent in total

Link to project: https://almondine-pricey-conchoraptor.glitch.me/

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [X] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [ ] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!
- [X] Difficulty Setting => sets patterns of different lengths, easy=5, medium=7, difficult=10
- [X] Display "lives left" or tries remaining before game over, update "dynamically"
- [X] Humorous dialogue to distract the player

## Video Walkthrough (GIF)

If you recorded multiple GIFs for all the implemented features, you can add them here:

![](http://g.recordit.co/wcUek9vpC2.gif)
 
![](http://g.recordit.co/EYCBiK7zu8.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

StackOverflow for javascript syntax stuff I didn't know, the book Clean Code, some online references for HTML & CSS styling choices and the sound map for the frequencies of sounds for chords

https://stackoverflow.com/questions/2044760/default-array-values

https://marcgg.com/blog/2016/11/01/javascript-audio/

https://www.w3schools.com/css//css_font_websafe.asp

https://www.w3schools.com/cssref/css_colors.asp

https://www.w3schools.com/howto/howto_css_pill_button.asp

https://stackoverflow.com/questions/30035932/how-do-i-use-this-javascript-variable-in-html/30035967

2. What was a challenge you encountered in creating this submission (be specific)? 
	How did you overcome it? (recommended 200 - 400 words) 
	
I had a lot of fun programming each new quirk into my memory game for my first real web project ever, though I have a background with C and Java for small tasks and school work. 

The first idea that came to my mind during my brainstorm, before even touching the code, was implementing a difficulty mode tied to pattern length. The problem, I soon realized, was array sizing. I realized that if I replayed a game and switched difficulty modes in between games, the second game used the same size array as the other mode. A bug, basically. In the beginning, I only had one array, pattern[], and I wanted it to be a certain size, but not explicitly at a length programmed by me. I couldn’t “switch” between arrays of different sizes until I realized I needed another array. Two actually, since I wanted to implement easy, medium and hard modes, making three arrays total. 

Since I only needed to populate one of the three given arrays once per game, I put some code in the startGame function to populate only one of arrays, which was set by the user when they select a difficulty mode button. I used an if statement in startGame() to ensure the right array size was populated. Then, I used a for loop to iterate up to, for example, five representing the maximum game length for easy mode, each round increasing in length until the max.

Another issue I encountered was adding a button that dynamically updated the amount of tries the user had left before a lose condition triggered stopGame. I wanted the HTML button to show a JavaScript variable with some flavor text added, as in, “3 tries remaining”. This is crucial information to the user for any game, I thought! What I didn’t understand at first was that HTML is just a markup language, and that I needed javascript to ‘tell’ HTML what to display at what time.

I ended up creating a function that updates the lives remaining on-screen each time its updated by the user, when they enter a wrong guess basically. I wired up this function to be called every time a wrong guess was detected upon button clicking during gameplay. The function itself sends some javascript variables, an integer chancesBeforeLoss and a short string of flavor text, to be displayed directly to some HTML button with a specific id, via .innerHTML. I had to research how to do this because I didn't know about it when I first started.

	
3. What questions about web development do you have after completing your submission? 
	(recommended 100 - 300 words)
	
One of the things I noticed very quickly was keeping track of all the changes to my codebase. Of course, once I implemented something new, it would affect something else if I didn’t watch my steps carefully. I can see how important version control is.

My question is how do large organizations manage it all? I’m just one person and I’m still learning how to manage my own version control, so how can a group of 20, 50, or 100 people get all this collaboration done? Clearly, we don’t even need to be in the same geographic location get some group work done, so tracking who is doing what to the codebase seems to be a good solution. Github is friendly enough to use for a new person, but I can see there’s so much more going on under the hood, and I really need to spend time with it and learn its ins and outs.

Next, I will admit I’m not the most stylistic person, because I’m much more interested in the nuts and bolts behind the web program. I’d like to know, then, is how some websites end up looking so attractive and even original? It must be challenging to “invent” new web style with all the tools at our disposal. Design in the real world, like in fashion, in itself is very expressive and emotional at times, so I’d love to know how web designers get it all done and express themselves in that medium. 

4. If you had a few more hours to work on this project, what would you spend them doing 
	(for example: refactoring certain functions, adding additional features, etc).
	Be specific. (recommended 100 - 300 words) 

I gave myself a time budget of about 20 hours to work on this project, some of which was not spent writing code on the Glitch platform. I was researching how to implement something in languages I’m not familiar with, and I found myself at times reading more than coding. 

If I had more time, I’d implement some advanced, or quirky, features like a hint feature, a ‘JAM!’ button, or speed mode. 

More exotic things could be implemented like background music you might hear in an elevator, or random facts crawl about the history of the memory game (Hasbro’s Simon Says) along the bottom of the browser, like you might see on a news network.

A hint button might prompt the user after a few seconds of inactivity midway through a pattern with the next correct button. This might be fun for the easy mode. However, in difficult mode, maybe the hint feature just teases the user by displaying some distracting dialogue.

A ‘JAM!’ button might randomly input a combo of two buttons, like red and blue, as just one attempt at a guess. I think this might be fun just once per game, as a last-ditch effort to try to advance the round without losing.

Lastly, I like the idea of speed mode! The game is just really fast, and progresses to as many rounds as the user can guess before entering the wrong sequence guess. The game might remember the users highest score and time and display a ‘hall of fame’ type statistics display for history of best scores.


## Interview Recording URL Link

[My 5-minute Interview Recording](https://www.loom.com/share/4ed4048860c147f396a4228815303d03)


## License

    Copyright [IAN ALEXANDER RODRIGUEZ]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
