//in
[
    "date > tmp/1",
    "INIT",
    "ADD",
    "COMMIT",
    "mv tmp/1 tmp/11",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "ADD",
    "COMMIT",
    "mv tmp/sub/2 tmp/sub/22",
    "STATUS",
    "ADD",
    "COMMIT",
    "STATUS"
]
//out
{"modified":[],"added":["11"],"deleted":["1"]}
{"modified":[],"added":[],"deleted":[]}
{"modified":[],"added":["sub/22"],"deleted":["sub/2"]}
{"modified":[],"added":[],"deleted":[]}