## MILESTONE 1

For project 2, we are planning to analysis a git repository and display the result as a 2d platform game for the user to explorer. For the git repository, we will analysis all the commits based on the properties such as the branch, no. of lines that were added, no. of files that were deleted and more. Once we finish the analysis, we will assign sprites such as blocks, coins, items, and even monsters to the commit based on the analysis result. Eventually we will create the game map using the sprites assigned to all the commits. The first commit will be the start of the map and the last commit will be the end of the map. Our goal is to let the user control the character in game and explore the map that were created from their git repository.<br/><br/>

We have talked with Amir and got some feedbacks on our project 2 idea. The TA suggested that our visualization idea of making a game may not be helpful at analyzing the git repository. And we should do some more researches on the existing git visualization tool.

For the next week, we are planning to do the following:

 - Do more researches on git visualization 
 - Do more researches on tools that can help us analysis the git repository
 - Finalize the project 2 idea and provide better description on its feature  
 - Finalize the language & framework we want to use for project 2


## MILESTONE 2

Since last week, we have received the feedback from Amir about our project 2 idea. Amir suggested that we want to emphysis our analysis on the source code. We have done more searching and brainstorming during the weenk and talked with our TA and Alex about our idea on the project 2. Eventually we came up with the below idea:

Code coverage tools are useful and tell us how much of an aplication is touched by an existing test suite, but sometimes we want to know exactly how a certain input makes our application behave. To solve this problem we are building a tool to generate a call graph for an application given certain inputs. This tool will perform a dynamic analysis of a Java programs. Given an entry point and set of inputs, we will execute the program, storing the input parameters, return value and possible other information about each method call. Then we will render a call graph that displays a node containing the relevant information for each method call.

For this project, we will have Nick, Muriel and Shobhit working on implement analysis of the Java program. Meanwhile, Francis and Roy will be working on designing and implementing the visualization. 

Roadmap for the remaning week will be:
- November 7th - 11th: Research, evaluation and initial implementation on the tools for the Java program analysis and visualizations.
- November 12th - 19th: Implementation for the Java program analysis and visualizations.
- November 20th - 24th: Integrate the Java program analysis result wiuth the visualization tool.
- November 25th - 29th: Testing, debugging and wrap up the changes.
- November 30th: Deadline of the project.

## MILESTONE 3

Since last week, we have done more researches on the program dynamic analysis and the visualization idea. As we have looked into some dynamic analysis and visualization tools, we have came up with our final program analysis and visualisation idea.

We are planning to create a web application using ReactJS that perform dynamic analysis on javascript code and visualize the result in a force directed graph. The web application will contains a editor that allow the user to write or copy/paste javascript code. Once the user finish writting the code and run the analysis, it will analysis the execution flow of the javascript program. Next it will generate and display a force directed graph using d3.js. The node of the graph will represent the functions that were executed with the variables, and the edge will represent the call flow. The visualization will allow the user to see their code flow in realtime. 

We will be using a library called Iroh (https://github.com/maierfelix/Iroh) to do the analysis and d3.js to do our visualization both libraries require a significant amount of programming to use.

We have made some changes to our project this week:
- First, we decided to do our dynamic analysis on Javascript instead of Java. This is due to some limitations on the existing dynamic analysis tools for Java. 
- Instead of let the user upload their source code, we plan to create a user interface where the user can write javascript code and then produce a visualization just like the one outlined in the previous milestone.


User Study #1: We explained our analysis to a programmer with experience using Javascript and showed them a mock up of the vizualization. 
Then we asked the following questions to get feedback on our plan. The mock up visualization we used is in sample.png.

![Sample Visualization](/screenshots/sample.png?raw=true "Sample Visualization")

Name: Peter Gawtry 
Programming Experience: 5 years of front end web development
Javascript Experience: 5 years


Questions:

1. Do you or have you used any dynamic analysis tools for Javascript?

   No.


2. Would you use this analysis tool?

   Maybe. It's nice that it will be super easy to use. Many dynamic analysis tools require a lot of set up and programming to make work. This is simple and convenient.


3. What problems would this analysis tool help you solve?

   It could be useful for understanding code written by other people. Javascript can be a little messy and hard to follow, especially if a file is large. This tool would provide an easy and fast way to see the flow of data during execution. It could also be useful for testing. Code coverage for unit tests is nice, but sometimes it's also valuable to see the actual data flow from each test.


4. Is there any information that you would add to the nodes or the edges that would make the visualization more useful?

   It would be nice to see the time spent in each function each time it's called and the total time spent in each function (including all calls to that method).


Conclusion: Peter seemed to really like the idea. He had a very good suggestions about including some analysis on the time spent in each function. We will include this in our final implementation.
<br/><br/>

## MILESTONE 4
<br/>

Status of the implementation:<br/>
React Front-end: <br/>
- Main UI: Started
- Javascript Editor: Started
- Visualization using [d3js](https://d3js.org/): On Going
Express Back-end: 
- Dynamic analysis using [Iroh](https://github.com/maierfelix/Iroh): On Going
<br/><br/>

Planned timeline for the remaining days:
- Nov 20th: Progress update meeting 
- Nov 21th: Integrate the current visulization implementation to the react project. Continue the development on front-end.  
- Nov 23th: Resume the back-end development. Start the front-end and back-end integration.  
- Nov 24th: Meeting to review the development progress.
- Nov 26th: Meeting to review the development progress.
- Nov 27th: Final user study.
- Nov 28th: Wrap the front-end and back-end development. Start to prepare the required documentations and demo video for the final submission.
- Nov 29th: Finish up the required documentations and demo video. Wrap up the testings.
- Nov 30th: Day of final submission.

<br/>
Plans for final user study:
<br/>
<br/>

* Provide a prototype demo of our project to the user, and allow them to code in the editor and explord the visualization.
* Answer and write down any questions users asked.
* Ask the below questions to the user:
   * Do you or have you used any dynamic analysis tools for Javascript?
   * Would you use this analysis tool?
   * What problems would this analysis tool help you solve?
   * Is there any information that you would add to the nodes or the edges that would make the visualization more useful?
   * Is there any feature that you think is missing from this tool?