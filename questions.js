const questions = [

{
question: "What does HTML stand for?",
options: [
"Hyper Text Markup Language",
"High Text Machine Language",
"Hyper Transfer Markup Language",
"Home Tool Markup Language"
],
answer: "Hyper Text Markup Language",
hint: "HTML is used to structure web pages."
},

{
question: "Which tag creates a hyperlink?",
options: [
"<a>",
"<link>",
"<p>",
"<img>"
],
answer: "<a>",
hint: "Anchor tag."
},

{
question: "Which CSS property changes text color?",
options: [
"font-color",
"text-color",
"color",
"background-color"
],
answer: "color",
hint: "Very common CSS property."
},

{
question: "Which CSS property changes background color?",
options: [
"background",
"background-color",
"color",
"fill"
],
answer: "background-color",
hint: "Used for changing element backgrounds."
},

{
question: "Inside which HTML tag do we write JavaScript?",
options: [
"<style>",
"<js>",
"<script>",
"<javascript>"
],
answer: "<script>",
hint: "Placed near the bottom of HTML."
},

{
question: "Which symbol is used for comments in JavaScript?",
options: [
"//",
"#",
"/*/",
"--"
],
answer: "//",
hint: "Two forward slashes."
},

{
question: "Which keyword declares a variable?",
options: [
"int",
"var",
"float",
"number"
],
answer: "var",
hint: "ES6 also introduced let and const."
},

{
question: "Which operator is used for strict equality?",
options: [
"=",
"==",
"===",
"!="
],
answer: "===",
hint: "Triple equals."
},

{
question: "Which company developed Java?",
options: [
"Microsoft",
"Sun Microsystems",
"Google",
"IBM"
],
answer: "Sun Microsystems",
hint: "Before Oracle."
},

{
question: "Which keyword creates a class in Java?",
options: [
"object",
"function",
"class",
"new"
],
answer: "class",
hint: "Used in OOP."
},

{
question: "What does SQL stand for?",
options: [
"Structured Query Language",
"Simple Query Language",
"Sequential Query Language",
"System Query Language"
],
answer: "Structured Query Language",
hint: "Database language."
},

{
question: "Which SQL command retrieves data?",
options: [
"GET",
"SELECT",
"SHOW",
"DISPLAY"
],
answer: "SELECT",
hint: "SELECT * FROM table."
},

{
question: "Which data structure uses FIFO?",
options: [
"Stack",
"Queue",
"Tree",
"Graph"
],
answer: "Queue",
hint: "First In First Out."
},

{
question: "Which data structure uses LIFO?",
options: [
"Queue",
"Stack",
"Array",
"Graph"
],
answer: "Stack",
hint: "Last In First Out."
},

{
question: "What does API stand for?",
options: [
"Application Programming Interface",
"Advanced Programming Interface",
"Application Process Integration",
"Automatic Programming Interface"
],
answer: "Application Programming Interface",
hint: "Used in web development."
},

{
question: "Which protocol is used for secure websites?",
options: [
"HTTP",
"HTTPS",
"FTP",
"SMTP"
],
answer: "HTTPS",
hint: "Contains SSL/TLS."
},

{
question: "Which Git command uploads code to GitHub?",
options: [
"git pull",
"git push",
"git clone",
"git init"
],
answer: "git push",
hint: "Sends local changes."
},

{
question: "Which Git command downloads a repository?",
options: [
"git push",
"git clone",
"git init",
"git add"
],
answer: "git clone",
hint: "Copies repository."
},

{
question: "Python uses which keyword for functions?",
options: [
"fun",
"define",
"def",
"function"
],
answer: "def",
hint: "def myFunction():"
},

{
question: "Which symbol starts a Python comment?",
options: [
"//",
"#",
"--",
"/*"
],
answer: "#",
hint: "Single hash."
},
  
{
question: "Which keyword creates a constant in JavaScript?",
options: ["const", "var", "let", "static"],
answer: "const",
hint: "Cannot be reassigned."
},

{
question: "Which array method adds an element at the end?",
options: ["push()", "pop()", "shift()", "slice()"],
answer: "push()",
hint: "Opposite of pop()."
},

{
question: "Which array method removes the last element?",
options: ["push()", "pop()", "shift()", "unshift()"],
answer: "pop()",
hint: "Removes from the end."
},

{
question: "Which keyword is used for conditional statements?",
options: ["loop", "if", "switch", "while"],
answer: "if",
hint: "if(condition)"
},

{
question: "Which loop runs while a condition is true?",
options: ["for", "foreach", "while", "switch"],
answer: "while",
hint: "while(condition)"
},

{
question: "Which symbol is used for logical AND?",
options: ["&", "&&", "||", "!"],
answer: "&&",
hint: "Double ampersand."
},

{
question: "Which symbol is used for logical OR?",
options: ["&&", "|", "||", "!"],
answer: "||",
hint: "Two vertical bars."
},

{
question: "Which function prints output in JavaScript?",
options: ["print()", "display()", "console.log()", "echo()"],
answer: "console.log()",
hint: "Used in browser console."
},

{
question: "Which method converts JSON to object?",
options: ["JSON.parse()", "JSON.stringify()", "parseInt()", "toObject()"],
answer: "JSON.parse()",
hint: "Used when receiving API data."
},

{
question: "Which method converts object to JSON string?",
options: ["JSON.parse()", "JSON.stringify()", "toJSON()", "convert()"],
answer: "JSON.stringify()",
hint: "Opposite of JSON.parse()."
},

{
question: "Which HTML tag inserts an image?",
options: ["<picture>", "<image>", "<img>", "<src>"],
answer: "<img>",
hint: "Requires src attribute."
},

{
question: "Which HTML tag creates a paragraph?",
options: ["<h1>", "<div>", "<p>", "<text>"],
answer: "<p>",
hint: "Used for text blocks."
},

{
question: "Which HTML tag creates a heading?",
options: ["<header>", "<h1>", "<title>", "<head>"],
answer: "<h1>",
hint: "Largest heading tag."
},

{
question: "Which CSS property changes font size?",
options: ["font-style", "font-weight", "font-size", "text-size"],
answer: "font-size",
hint: "Measured in px, rem, em."
},

{
question: "Which CSS property makes text bold?",
options: ["font-style", "font-weight", "font-size", "text-transform"],
answer: "font-weight",
hint: "Value can be bold."
},

{
question: "Which CSS property aligns text?",
options: ["align", "text-align", "justify-content", "position"],
answer: "text-align",
hint: "center, left, right."
},

{
question: "Which SQL command inserts data?",
options: ["ADD", "INSERT INTO", "CREATE", "UPDATE"],
answer: "INSERT INTO",
hint: "Adds rows to a table."
},

{
question: "Which SQL command deletes data?",
options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
answer: "DELETE",
hint: "DELETE FROM table."
},

{
question: "Which SQL command updates data?",
options: ["MODIFY", "ALTER", "UPDATE", "CHANGE"],
answer: "UPDATE",
hint: "UPDATE table SET..."
},

{
question: "What does OOP stand for?",
options: [
"Object Oriented Programming",
"Open Object Programming",
"Online Object Process",
"Object Operator Programming"
],
answer: "Object Oriented Programming",
hint: "Based on classes and objects."
}

,
{
question: "Python is an example of which type of language?",
options: ["Low-level", "Machine", "High-level", "Assembly"],
answer: "High-level",
hint: "Easy to read and write."
},

{
question: "Which keyword is used to create a loop in Python?",
options: ["repeat", "loop", "for", "iterate"],
answer: "for",
hint: "for i in range()."
},

{
question: "Which function gives the length of a list in Python?",
options: ["size()", "count()", "len()", "length()"],
answer: "len()",
hint: "Returns number of elements."
},

{
question: "Which symbol is used for exponentiation in Python?",
options: ["^", "**", "//", "%%"],
answer: "**",
hint: "2 ** 3 = 8."
},

{
question: "Which data type stores True or False values?",
options: ["String", "Integer", "Boolean", "Float"],
answer: "Boolean",
hint: "bool type."
},

{
question: "Which keyword defines a function in Python?",
options: ["function", "define", "def", "fun"],
answer: "def",
hint: "def myFunction():"
},

{
question: "Which operator performs integer division?",
options: ["/", "//", "%", "**"],
answer: "//",
hint: "10 // 3 = 3."
},

{
question: "Which collection is ordered and mutable?",
options: ["Tuple", "Set", "List", "Dictionary"],
answer: "List",
hint: "Uses square brackets."
},

{
question: "Which collection stores key-value pairs?",
options: ["Tuple", "Dictionary", "Set", "List"],
answer: "Dictionary",
hint: "Uses curly braces."
},

{
question: "Which keyword exits a loop?",
options: ["stop", "break", "exit", "return"],
answer: "break",
hint: "Used inside loops."
},

{
question: "Java is primarily a ______ language.",
options: ["Procedural", "Object-Oriented", "Assembly", "Machine"],
answer: "Object-Oriented",
hint: "Based on classes and objects."
},

{
question: "Which method is the entry point in Java?",
options: ["start()", "main()", "run()", "execute()"],
answer: "main()",
hint: "public static void main."
},

{
question: "Which keyword creates an object in Java?",
options: ["class", "create", "new", "object"],
answer: "new",
hint: "new Student();"
},

{
question: "Which keyword is used for inheritance in Java?",
options: ["implements", "extends", "inherits", "super"],
answer: "extends",
hint: "class Child extends Parent."
},

{
question: "Which access modifier makes members accessible everywhere?",
options: ["private", "protected", "default", "public"],
answer: "public",
hint: "Most open access level."
},

{
question: "Which keyword prevents inheritance?",
options: ["stop", "const", "static", "final"],
answer: "final",
hint: "final class."
},

{
question: "Which keyword refers to the current object?",
options: ["self", "current", "this", "super"],
answer: "this",
hint: "Used inside a class."
},

{
question: "Which package contains Scanner class?",
options: ["java.io", "java.util", "java.lang", "java.net"],
answer: "java.util",
hint: "Used for user input."
},

{
question: "Which symbol ends statements in Java?",
options: [".", ",", ";", ":"],
answer: ";",
hint: "Every statement ends with it."
},

{
question: "Which keyword handles exceptions?",
options: ["error", "catch", "try", "except"],
answer: "try",
hint: "try-catch block."
},
  
{
question: "Which language is known as the mother of all object-oriented languages?",
options: ["Java", "C++", "Smalltalk", "Python"],
answer: "Smalltalk",
hint: "One of the earliest OOP languages."
},

{
question: "Which symbol is used for single-line comments in C++?",
options: ["#", "//", "/*", "--"],
answer: "//",
hint: "Same as JavaScript."
},

{
question: "Which header file is used for input and output in C++?",
options: ["stdio.h", "iostream", "math.h", "string.h"],
answer: "iostream",
hint: "Contains cin and cout."
},

{
question: "Which keyword creates a class in C++?",
options: ["object", "struct", "class", "new"],
answer: "class",
hint: "class Student {}"
},

{
question: "Which operator is used to access members using an object?",
options: ["->", "::", ".", ":"],
answer: ".",
hint: "obj.name"
},

{
question: "Which keyword dynamically allocates memory in C++?",
options: ["malloc", "alloc", "new", "create"],
answer: "new",
hint: "new int;"
},

{
question: "Which keyword releases memory allocated with new?",
options: ["free", "delete", "remove", "clear"],
answer: "delete",
hint: "delete ptr;"
},

{
question: "Which OOP concept hides internal details?",
options: [
"Inheritance",
"Polymorphism",
"Abstraction",
"Association"
],
answer: "Abstraction",
hint: "Shows only essential features."
},

{
question: "Which OOP concept restricts direct access to data?",
options: [
"Encapsulation",
"Inheritance",
"Polymorphism",
"Aggregation"
],
answer: "Encapsulation",
hint: "Data hiding."
},

{
question: "Which OOP concept allows code reuse?",
options: [
"Abstraction",
"Inheritance",
"Polymorphism",
"Composition"
],
answer: "Inheritance",
hint: "Child class inherits parent."
},

{
question: "Which OOP concept allows multiple forms of a method?",
options: [
"Polymorphism",
"Encapsulation",
"Abstraction",
"Inheritance"
],
answer: "Polymorphism",
hint: "Method overloading and overriding."
},

{
question: "Which keyword is used to inherit a class in C++?",
options: ["extends", "inherits", ":", "super"],
answer: ":",
hint: "class Child : public Parent."
},

{
question: "Which access specifier allows access only within the class?",
options: [
"public",
"protected",
"private",
"default"
],
answer: "private",
hint: "Most restrictive."
},

{
question: "Which access specifier allows access everywhere?",
options: [
"private",
"public",
"protected",
"friend"
],
answer: "public",
hint: "Least restrictive."
},

{
question: "Which keyword refers to the parent class constructor in Java?",
options: [
"this",
"base",
"super",
"parent"
],
answer: "super",
hint: "super()"
},

{
question: "What is method overloading?",
options: [
"Same method with different parameters",
"Same class with different names",
"Different classes with same variables",
"Multiple inheritance"
],
answer: "Same method with different parameters",
hint: "Compile-time polymorphism."
},

{
question: "What is method overriding?",
options: [
"Changing variable names",
"Same method in parent and child class",
"Deleting methods",
"Copying methods"
],
answer: "Same method in parent and child class",
hint: "Run-time polymorphism."
},

{
question: "Which keyword creates an object in C++?",
options: [
"class",
"object",
"new",
"create"
],
answer: "new",
hint: "Dynamic memory allocation."
},

{
question: "Which function acts like a destructor in C++?",
options: [
"~ClassName()",
"destroy()",
"delete()",
"free()"
],
answer: "~ClassName()",
hint: "Starts with ~ symbol."
},

{
question: "Which concept combines data and methods together?",
options: [
"Polymorphism",
"Abstraction",
"Encapsulation",
"Inheritance"
],
answer: "Encapsulation",
hint: "Data + methods inside a class."
},
  
{
question: "What does DBMS stand for?",
options: [
"Database Management System",
"Data Backup Management System",
"Database Mapping System",
"Data Management Service"
],
answer: "Database Management System",
hint: "Used to manage databases."
},

{
question: "Which language is used to interact with databases?",
options: [
"HTML",
"CSS",
"SQL",
"Java"
],
answer: "SQL",
hint: "Structured Query Language."
},

{
question: "Which key uniquely identifies a record?",
options: [
"Foreign Key",
"Primary Key",
"Candidate Key",
"Alternate Key"
],
answer: "Primary Key",
hint: "Cannot contain duplicate values."
},

{
question: "Which key creates relationships between tables?",
options: [
"Primary Key",
"Candidate Key",
"Foreign Key",
"Unique Key"
],
answer: "Foreign Key",
hint: "References another table."
},

{
question: "Which SQL command removes an entire table?",
options: [
"DELETE",
"REMOVE",
"DROP",
"CLEAR"
],
answer: "DROP",
hint: "DROP TABLE table_name."
},

{
question: "Which SQL command removes all records but keeps the table?",
options: [
"DELETE",
"TRUNCATE",
"DROP",
"REMOVE"
],
answer: "TRUNCATE",
hint: "Table structure remains."
},

{
question: "Which SQL clause sorts results?",
options: [
"GROUP BY",
"ORDER BY",
"SORT BY",
"HAVING"
],
answer: "ORDER BY",
hint: "Ascending or descending."
},

{
question: "Which SQL clause filters grouped data?",
options: [
"WHERE",
"HAVING",
"ORDER BY",
"LIMIT"
],
answer: "HAVING",
hint: "Used with GROUP BY."
},

{
question: "What does ACID stand for?",
options: [
"Atomicity, Consistency, Isolation, Durability",
"Access, Control, Integrity, Data",
"Atomic, Central, Indexed, Durable",
"Automatic, Consistent, Internal, Data"
],
answer: "Atomicity, Consistency, Isolation, Durability",
hint: "Properties of transactions."
},

{
question: "Which join returns matching rows only?",
options: [
"LEFT JOIN",
"RIGHT JOIN",
"INNER JOIN",
"FULL JOIN"
],
answer: "INNER JOIN",
hint: "Common records only."
},

{
question: "Which join returns all rows from the left table?",
options: [
"LEFT JOIN",
"RIGHT JOIN",
"INNER JOIN",
"CROSS JOIN"
],
answer: "LEFT JOIN",
hint: "Includes unmatched rows."
},

{
question: "Which join returns all rows from the right table?",
options: [
"LEFT JOIN",
"RIGHT JOIN",
"INNER JOIN",
"SELF JOIN"
],
answer: "RIGHT JOIN",
hint: "Opposite of LEFT JOIN."
},

{
question: "What is normalization?",
options: [
"Removing redundancy",
"Creating indexes",
"Deleting records",
"Encrypting data"
],
answer: "Removing redundancy",
hint: "Improves database design."
},

{
question: "Which normal form removes partial dependency?",
options: [
"1NF",
"2NF",
"3NF",
"BCNF"
],
answer: "2NF",
hint: "After First Normal Form."
},

{
question: "Which normal form removes transitive dependency?",
options: [
"1NF",
"2NF",
"3NF",
"4NF"
],
answer: "3NF",
hint: "Third Normal Form."
},

{
question: "Which SQL operator checks for a range?",
options: [
"IN",
"BETWEEN",
"LIKE",
"EXISTS"
],
answer: "BETWEEN",
hint: "BETWEEN x AND y."
},

{
question: "Which SQL operator checks patterns?",
options: [
"LIKE",
"BETWEEN",
"IN",
"ALL"
],
answer: "LIKE",
hint: "Uses % wildcard."
},

{
question: "What is an index used for?",
options: [
"Faster searching",
"Deleting records",
"Creating tables",
"Encryption"
],
answer: "Faster searching",
hint: "Improves query performance."
},

{
question: "Which constraint prevents duplicate values?",
options: [
"CHECK",
"NOT NULL",
"UNIQUE",
"DEFAULT"
],
answer: "UNIQUE",
hint: "Ensures uniqueness."
},

{
question: "Which constraint prevents null values?",
options: [
"CHECK",
"UNIQUE",
"NOT NULL",
"PRIMARY"
],
answer: "NOT NULL",
hint: "Value is required."
},
  
{
question: "Which data structure stores elements in contiguous memory?",
options: [
"Linked List",
"Array",
"Tree",
"Graph"
],
answer: "Array",
hint: "Elements are stored one after another."
},

{
question: "Which data structure follows LIFO?",
options: [
"Queue",
"Stack",
"Tree",
"Graph"
],
answer: "Stack",
hint: "Last In First Out."
},

{
question: "Which data structure follows FIFO?",
options: [
"Stack",
"Queue",
"Tree",
"Array"
],
answer: "Queue",
hint: "First In First Out."
},

{
question: "Which data structure consists of nodes and pointers?",
options: [
"Array",
"Linked List",
"Stack",
"Queue"
],
answer: "Linked List",
hint: "Dynamic memory allocation."
},

{
question: "Which linked list allows traversal in both directions?",
options: [
"Singly Linked List",
"Circular Linked List",
"Doubly Linked List",
"Linear List"
],
answer: "Doubly Linked List",
hint: "Has previous and next pointers."
},

{
question: "Which operation inserts an element into a stack?",
options: [
"Pop",
"Push",
"Peek",
"Delete"
],
answer: "Push",
hint: "Adds element on top."
},

{
question: "Which operation removes an element from a stack?",
options: [
"Push",
"Insert",
"Pop",
"Peek"
],
answer: "Pop",
hint: "Removes top element."
},

{
question: "Which operation removes an element from a queue?",
options: [
"Push",
"Pop",
"Dequeue",
"Peek"
],
answer: "Dequeue",
hint: "Removes front element."
},

{
question: "Which operation inserts an element into a queue?",
options: [
"Push",
"Pop",
"Enqueue",
"Delete"
],
answer: "Enqueue",
hint: "Adds at rear."
},

{
question: "Which data structure is used for recursion?",
options: [
"Queue",
"Stack",
"Tree",
"Array"
],
answer: "Stack",
hint: "Function calls are stored here."
},

{
question: "Which tree has at most two children?",
options: [
"AVL Tree",
"Binary Tree",
"B Tree",
"Heap"
],
answer: "Binary Tree",
hint: "Left and right child."
},

{
question: "Which traversal visits root first?",
options: [
"Inorder",
"Postorder",
"Preorder",
"Level Order"
],
answer: "Preorder",
hint: "Root → Left → Right."
},

{
question: "Which traversal visits root last?",
options: [
"Preorder",
"Inorder",
"Postorder",
"Level Order"
],
answer: "Postorder",
hint: "Left → Right → Root."
},

{
question: "Which searching algorithm works on sorted arrays?",
options: [
"Linear Search",
"Binary Search",
"DFS",
"BFS"
],
answer: "Binary Search",
hint: "Divides array into halves."
},

{
question: "What is the time complexity of Binary Search?",
options: [
"O(n)",
"O(log n)",
"O(n²)",
"O(1)"
],
answer: "O(log n)",
hint: "Very efficient."
},

{
question: "Which sorting algorithm repeatedly swaps adjacent elements?",
options: [
"Merge Sort",
"Bubble Sort",
"Quick Sort",
"Heap Sort"
],
answer: "Bubble Sort",
hint: "Largest element moves to the end."
},

{
question: "Which sorting algorithm uses divide and conquer?",
options: [
"Selection Sort",
"Bubble Sort",
"Merge Sort",
"Insertion Sort"
],
answer: "Merge Sort",
hint: "Splits arrays recursively."
},

{
question: "Which sorting algorithm has average complexity O(n log n)?",
options: [
"Bubble Sort",
"Selection Sort",
"Quick Sort",
"Insertion Sort"
],
answer: "Quick Sort",
hint: "Pivot-based sorting."
},

{
question: "Which graph traversal uses a queue?",
options: [
"DFS",
"BFS",
"Binary Search",
"Heap Traversal"
],
answer: "BFS",
hint: "Breadth First Search."
},

{
question: "Which graph traversal uses a stack?",
options: [
"DFS",
"BFS",
"Level Order",
"Binary Search"
],
answer: "DFS",
hint: "Depth First Search."
},
  
{
question: "What does OSI stand for?",
options: [
"Open Systems Interconnection",
"Operating System Interface",
"Open Software Integration",
"Online System Interface"
],
answer: "Open Systems Interconnection",
hint: "Seven-layer networking model."
},

{
question: "How many layers are in the OSI model?",
options: [
"5",
"6",
"7",
"8"
],
answer: "7",
hint: "Physical to Application layer."
},

{
question: "Which layer is responsible for routing?",
options: [
"Transport",
"Network",
"Session",
"Presentation"
],
answer: "Network",
hint: "Handles IP addresses."
},

{
question: "Which protocol is used to transfer web pages?",
options: [
"FTP",
"SMTP",
"HTTP",
"SSH"
],
answer: "HTTP",
hint: "HyperText Transfer Protocol."
},

{
question: "Which protocol provides secure communication?",
options: [
"HTTP",
"HTTPS",
"FTP",
"SMTP"
],
answer: "HTTPS",
hint: "Uses SSL/TLS."
},

{
question: "What does DNS stand for?",
options: [
"Domain Name System",
"Data Network Service",
"Dynamic Naming System",
"Domain Network Server"
],
answer: "Domain Name System",
hint: "Converts names into IP addresses."
},

{
question: "Which protocol is used for email sending?",
options: [
"POP3",
"SMTP",
"FTP",
"HTTP"
],
answer: "SMTP",
hint: "Simple Mail Transfer Protocol."
},

{
question: "Which protocol is used to receive emails?",
options: [
"SMTP",
"POP3",
"FTP",
"SSH"
],
answer: "POP3",
hint: "Post Office Protocol."
},

{
question: "Which protocol is used for file transfer?",
options: [
"FTP",
"HTTP",
"SMTP",
"TCP"
],
answer: "FTP",
hint: "File Transfer Protocol."
},

{
question: "What does IP stand for?",
options: [
"Internet Protocol",
"Internal Process",
"Internet Process",
"Interface Protocol"
],
answer: "Internet Protocol",
hint: "Used for addressing."
},

{
question: "Which device forwards packets between networks?",
options: [
"Hub",
"Switch",
"Router",
"Bridge"
],
answer: "Router",
hint: "Connects multiple networks."
},

{
question: "Which device works at the Data Link layer?",
options: [
"Router",
"Switch",
"Gateway",
"Repeater"
],
answer: "Switch",
hint: "Uses MAC addresses."
},

{
question: "Which device broadcasts data to all ports?",
options: [
"Router",
"Switch",
"Hub",
"Bridge"
],
answer: "Hub",
hint: "Less intelligent device."
},

{
question: "Which protocol guarantees reliable delivery?",
options: [
"UDP",
"TCP",
"IP",
"HTTP"
],
answer: "TCP",
hint: "Connection-oriented."
},

{
question: "Which protocol is connectionless?",
options: [
"TCP",
"UDP",
"HTTP",
"FTP"
],
answer: "UDP",
hint: "Faster but less reliable."
},

{
question: "Which port number is used for HTTP?",
options: [
"21",
"25",
"80",
"443"
],
answer: "80",
hint: "Default web traffic port."
},

{
question: "Which port number is used for HTTPS?",
options: [
"80",
"21",
"443",
"110"
],
answer: "443",
hint: "Secure web traffic."
},

{
question: "Which port is used by FTP?",
options: [
"21",
"25",
"80",
"143"
],
answer: "21",
hint: "File transfer."
},

{
question: "Which port is used by SMTP?",
options: [
"110",
"25",
"53",
"443"
],
answer: "25",
hint: "Mail transfer."
},

{
question: "What is the full form of LAN?",
options: [
"Local Area Network",
"Large Access Network",
"Logical Area Network",
"Local Access Node"
],
answer: "Local Area Network",
hint: "Used in homes and offices."
},

{
question: "What is an Operating System?",
options: [
"Application Software",
"System Software",
"Compiler",
"Database"
],
answer: "System Software",
hint: "Acts as an interface between user and hardware."
},

{
question: "Which OS is open source?",
options: [
"Windows",
"macOS",
"Linux",
"DOS"
],
answer: "Linux",
hint: "Popular among developers."
},

{
question: "What is a process?",
options: [
"Program in execution",
"Compiler",
"CPU",
"Memory"
],
answer: "Program in execution",
hint: "Active instance of a program."
},

{
question: "What is a thread?",
options: [
"Independent process",
"Lightweight process",
"Compiler",
"Memory unit"
],
answer: "Lightweight process",
hint: "Smallest unit of CPU execution."
},

{
question: "Which scheduling algorithm follows FIFO?",
options: [
"Round Robin",
"SJF",
"FCFS",
"Priority"
],
answer: "FCFS",
hint: "First Come First Serve."
},

{
question: "Which scheduling algorithm gives shortest jobs priority?",
options: [
"FCFS",
"Priority",
"Round Robin",
"SJF"
],
answer: "SJF",
hint: "Shortest Job First."
},

{
question: "Which scheduling algorithm assigns time slices?",
options: [
"Round Robin",
"FCFS",
"SJF",
"Priority"
],
answer: "Round Robin",
hint: "Used in time-sharing systems."
},

{
question: "What is deadlock?",
options: [
"CPU failure",
"Infinite loop",
"Processes waiting forever",
"Memory leak"
],
answer: "Processes waiting forever",
hint: "Resources are blocked."
},

{
question: "Which memory is temporary?",
options: [
"ROM",
"Hard Disk",
"RAM",
"SSD"
],
answer: "RAM",
hint: "Volatile memory."
},

{
question: "Which memory is permanent?",
options: [
"RAM",
"Cache",
"ROM",
"Register"
],
answer: "ROM",
hint: "Non-volatile."
},

{
question: "What is virtual memory?",
options: [
"Cloud memory",
"Secondary memory used as RAM",
"ROM memory",
"Cache memory"
],
answer: "Secondary memory used as RAM",
hint: "Extends RAM capacity."
},

{
question: "Which memory management technique divides memory into pages?",
options: [
"Segmentation",
"Paging",
"Swapping",
"Fragmentation"
],
answer: "Paging",
hint: "Fixed-size blocks."
},

{
question: "What is fragmentation?",
options: [
"Memory wastage",
"CPU scheduling",
"Thread creation",
"Deadlock prevention"
],
answer: "Memory wastage",
hint: "Internal or external."
},

{
question: "Which memory is fastest?",
options: [
"RAM",
"SSD",
"Cache",
"Hard Disk"
],
answer: "Cache",
hint: "Located near CPU."
},

{
question: "Which memory is directly accessed by CPU?",
options: [
"RAM",
"SSD",
"Hard Disk",
"DVD"
],
answer: "RAM",
hint: "Main memory."
},

{
question: "What is a semaphore?",
options: [
"Memory unit",
"Synchronization tool",
"Scheduling algorithm",
"Compiler"
],
answer: "Synchronization tool",
hint: "Controls access to resources."
},

{
question: "Which state comes after Ready state?",
options: [
"Blocked",
"Running",
"Terminated",
"Waiting"
],
answer: "Running",
hint: "CPU executes the process."
},

{
question: "Which state indicates completion of a process?",
options: [
"Ready",
"Waiting",
"Running",
"Terminated"
],
answer: "Terminated",
hint: "Execution finished."
},

{
question: "What is context switching?",
options: [
"Changing memory",
"Switching CPU from one process to another",
"Deleting process",
"Restarting OS"
],
answer: "Switching CPU from one process to another",
hint: "Occurs in multitasking."
},

{
question: "Which OS feature allows multiple programs to run simultaneously?",
options: [
"Multiprocessing",
"Multitasking",
"Paging",
"Booting"
],
answer: "Multitasking",
hint: "Improves CPU utilization."
}
,
{
question: "What is Git?",
options: [
"Programming Language",
"Version Control System",
"Database",
"Operating System"
],
answer: "Version Control System",
hint: "Tracks changes in code."
},

{
question: "Which command initializes a Git repository?",
options: [
"git start",
"git init",
"git create",
"git new"
],
answer: "git init",
hint: "Creates a new repository."
},

{
question: "Which command stages files for commit?",
options: [
"git push",
"git commit",
"git add",
"git clone"
],
answer: "git add",
hint: "Prepares changes."
},

{
question: "Which command saves changes permanently?",
options: [
"git push",
"git commit",
"git add",
"git merge"
],
answer: "git commit",
hint: "Creates a snapshot."
},

{
question: "Which command uploads code to GitHub?",
options: [
"git clone",
"git fetch",
"git push",
"git add"
],
answer: "git push",
hint: "Sends commits to remote repository."
},

{
question: "Which command downloads a repository?",
options: [
"git pull",
"git clone",
"git add",
"git push"
],
answer: "git clone",
hint: "Copies repository locally."
},

{
question: "Which command creates a branch?",
options: [
"git branch",
"git new",
"git switch",
"git create"
],
answer: "git branch",
hint: "Used for parallel development."
},

{
question: "Which command changes branches?",
options: [
"git merge",
"git branch",
"git checkout",
"git add"
],
answer: "git checkout",
hint: "Switches to another branch."
},

{
question: "What is GitHub?",
options: [
"Compiler",
"Cloud-based Git hosting platform",
"Programming Language",
"Database"
],
answer: "Cloud-based Git hosting platform",
hint: "Stores repositories online."
},

{
question: "What is a Pull Request?",
options: [
"Deleting code",
"Request to merge changes",
"Downloading repository",
"Creating branch"
],
answer: "Request to merge changes",
hint: "Common in team collaboration."
},

{
question: "What does API stand for?",
options: [
"Application Programming Interface",
"Advanced Programming Integration",
"Application Process Interface",
"Automatic Program Integration"
],
answer: "Application Programming Interface",
hint: "Used for communication between systems."
},

{
question: "Which HTTP method retrieves data?",
options: [
"POST",
"DELETE",
"GET",
"PUT"
],
answer: "GET",
hint: "Read operation."
},

{
question: "Which HTTP method creates new data?",
options: [
"POST",
"GET",
"DELETE",
"PATCH"
],
answer: "POST",
hint: "Create operation."
},

{
question: "Which HTTP method updates existing data?",
options: [
"GET",
"DELETE",
"PUT",
"TRACE"
],
answer: "PUT",
hint: "Update operation."
},

{
question: "Which HTTP method removes data?",
options: [
"PUT",
"GET",
"DELETE",
"POST"
],
answer: "DELETE",
hint: "Delete operation."
},

{
question: "Which format is commonly used in REST APIs?",
options: [
"XML",
"JSON",
"TXT",
"CSV"
],
answer: "JSON",
hint: "JavaScript Object Notation."
},

{
question: "What does JSON stand for?",
options: [
"Java Syntax Object Notation",
"JavaScript Object Notation",
"Java Standard Object Network",
"Joint Syntax Object Notation"
],
answer: "JavaScript Object Notation",
hint: "Lightweight data format."
},

{
question: "What is authentication?",
options: [
"Checking permissions",
"Verifying identity",
"Deleting data",
"Updating records"
],
answer: "Verifying identity",
hint: "Login process."
},

{
question: "What is authorization?",
options: [
"Verifying identity",
"Giving permissions",
"Encrypting passwords",
"Creating users"
],
answer: "Giving permissions",
hint: "Controls access."
},

{
question: "Which status code means Success?",
options: [
"404",
"500",
"200",
"403"
],
answer: "200",
hint: "OK response."
}
,
{
question: "Which JavaScript library is used for building user interfaces?",
options: [
"Node.js",
"Express.js",
"React",
"MongoDB"
],
answer: "React",
hint: "Created by Facebook."
},

{
question: "What is Node.js?",
options: [
"Database",
"JavaScript Runtime Environment",
"Programming Language",
"Compiler"
],
answer: "JavaScript Runtime Environment",
hint: "Runs JavaScript outside browsers."
},

{
question: "Which framework is commonly used with Node.js?",
options: [
"React",
"Angular",
"Express.js",
"Bootstrap"
],
answer: "Express.js",
hint: "Used for backend APIs."
},

{
question: "What is JSX?",
options: [
"JSON Extension",
"Java Syntax XML",
"JavaScript XML",
"Java XML Script"
],
answer: "JavaScript XML",
hint: "Used in React."
},

{
question: "Which hook manages state in React?",
options: [
"useState",
"useRef",
"useEffect",
"useMemo"
],
answer: "useState",
hint: "Very commonly used hook."
},

{
question: "Which hook handles side effects?",
options: [
"useState",
"useEffect",
"useRef",
"useContext"
],
answer: "useEffect",
hint: "Runs after rendering."
},

{
question: "What does AI stand for?",
options: [
"Automated Intelligence",
"Artificial Intelligence",
"Advanced Internet",
"Artificial Integration"
],
answer: "Artificial Intelligence",
hint: "Simulation of human intelligence."
},

{
question: "Which field allows computers to learn from data?",
options: [
"Networking",
"Machine Learning",
"DBMS",
"Operating Systems"
],
answer: "Machine Learning",
hint: "Subset of AI."
},

{
question: "Which algorithm is used for classification?",
options: [
"Linear Regression",
"Logistic Regression",
"Bubble Sort",
"DFS"
],
answer: "Logistic Regression",
hint: "Used for binary outcomes."
},

{
question: "Which library is popular for machine learning in Python?",
options: [
"NumPy",
"Matplotlib",
"Scikit-Learn",
"Pandas"
],
answer: "Scikit-Learn",
hint: "Provides ML algorithms."
},

{
question: "What does UI stand for?",
options: [
"User Interface",
"Universal Integration",
"User Internet",
"Utility Interface"
],
answer: "User Interface",
hint: "Visual part of applications."
},

{
question: "What does UX stand for?",
options: [
"User Experience",
"Universal Experience",
"User Execution",
"Utility Experience"
],
answer: "User Experience",
hint: "Focuses on usability."
},

{
question: "Which tool is commonly used for UI/UX design?",
options: [
"Git",
"Figma",
"Docker",
"Postman"
],
answer: "Figma",
hint: "Popular design tool."
},

{
question: "What is a prototype in UI/UX?",
options: [
"Database",
"Interactive model",
"Programming language",
"Server"
],
answer: "Interactive model",
hint: "Represents product flow."
},

{
question: "What is a product roadmap?",
options: [
"Bug report",
"Strategic plan",
"Database schema",
"API"
],
answer: "Strategic plan",
hint: "Shows future goals."
},

{
question: "What is Agile?",
options: [
"Programming language",
"Software development methodology",
"Database",
"Compiler"
],
answer: "Software development methodology",
hint: "Iterative approach."
},
];
