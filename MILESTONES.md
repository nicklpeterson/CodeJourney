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

For thsis project, we will have Nick, Muriel and Shobhit working on implement analysis of the Java program. Meanwhile, Francis and Roy will be working on designing and implementing the visualization. 

Roadmap for the remaning week will be:
November 7th - 11th: Research, evaluation and initial implementation on the tools for the Java program analysis and visualizations.
November 12th - 19th: Implementation for the Java program analysis and visualizations.
November 20th - 24th: Integrate the Java program analysis result wiuth the visualization tool.
November 25th - 29th: Testing, debugging and wrap up the changes.
November 30th: Deadline of the project.
