# README
Code Journey: A Visual Tool for Dynamic Analysis

## How to start
You need to run both Front-end and Back-end application to test this .
</br></br>

## How to install and run the project

To run the ba

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### User Studies

Note: We did several user studies for project 2. In our first user study we just interviewed the user about the visualization.
This user study was only moderately helpful, so we decided to change the user study for the remaining four users.

------------------------------
User Study 1

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
------------------------------
For the remaining user studies we gave the user a fairly complicated piece of Javascript code and asked them some questions about
it. The purpose of these first questions was just to get them thinking about what they do and do not know about the code. Then
We asked them questions about our visualization for this code to get valuable feedback and ideas.

The Code:
```
    function add(a, b) {
    		return foo(a + 1, b + 1);
    };
    function foo(a, b) {
        return bar(a + 1, b + 1);
    };
    function bar(a, b) {
        doNothing();
        let ret = 1;
        while (ret < 1000) {
        	ret += factorial(b);
        }
        return a + ret;
    }
    function doNothing() {
      console.log('do nothing');
    }
    function factorial(n) {
      doNothing();
      if (n === 1) {
        return 1;
        }
      return n * factorial(n - 1);
    }
    add(1, 1);
}
```


The Questions (primers to get the user thinking about the code, the idea is to not spend a lot of time on any individual question):
1.  How many times will bar call factorial? (No one was able to answer this correctly)
2.  How many times will factorial recurse in total?
3.  How many times is doNothing() called from Bar?
4.  How many times will doNothing() be called from factorial?

User Study 2 
Name: Kelsey Peterson
Programming Experience: 3rd year Computer Science student
Javascript Experience: <1 year

Questions:
1. Do you or have you used any dynamic analysis tools for Javascript?
    No.

2. Would you use this analysis tool?
    I would much rather use this than try to figure out by hand how many times bar will call factorial. So yes.
    
3. Would you rather see a node for each time a function is called or a single node per function?
    Interesting, before seeing the two examples I would have said one node per function makes more sense. But
    for small recursive functions I think it's cool to see the recursion tree. So, I think you should show a node for each
    function call.
    
4. Is there any information you would like to add to the visualization? 
    Yes, you should add the return value in the tooltip. 
    
Changes that we made from this user study:
    We added the return value in the tooltip.
    
    
User Study 3
Name: Danny Lyons
Programming Experience: 2nd year BCS Student
Javascript Experience: 1 year (including co-op and school)

Questions:
1. Do you or have you used any dynamic analysis tools for Javascript?
    No.

2. Would you use this analysis tool?
    Yes. It would be really fun to play with to try to generate interesting call graph. And, sometimes you want to know things
    like how many times a function was called or you need to unroll a recursive function for debugging.
    
3. Would you rather see a node for each time a function is called or a single node per function?
    Definitely one node per function. For interesting programs it will be too complicated the other way.
    
4. Is there any information you would like to add to the visualization? 
    Yes, you should add the name of the caller function to the tooltip. 
    
Changes that we made from this user study:
    We added the caller to the tooltip in the compact visualization. It's doesn't really make sense in the non-compact visualization.
    
User Study 4
Name: Mei Lew
Programming Experience: 4th year Computer Science Student
Javascript Experience: 2 years

Questions:
1. Do you or have you used any dynamic analysis tools for Javascript?
    No.

2. Would you use this analysis tool?
    Yes. It would help show the execution path in javascript files.
    
3. Would you rather see a node for each time a function is called or a single node per function?
    It doesn't really matter. Both are interesting in different ways.
    
4. Is there any information you would like to add to the visualization? 
    Not really.
    
Changes that we made from this user study:
    After this user story we realized that there was no definitive answer on whether we should include a single node per 
    functio or a single node per function call. We decided to implement both versions. We call the single node per function
    the 'compact' visualization.
    
 
