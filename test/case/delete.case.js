//in
[
    "mkdir tmp",
    "touch tmp/1",
    "INIT",
    "COMMIT",
    "rm tmp/1",
    "STATUS",
    "COMMIT",
    "mkdir tmp/sub",
    "touch tmp/sub/2",
    "touch tmp/sub/3",
    "COMMIT",
    "rm tmp/sub/3",
    "STATUS",
    "rm -rf tmp/sub",
    "STATUS",
    "rm -rf tmp"
]
//out
{"modified":[],"added":[],"deleted":["1"]}
{"modified":[],"added":[],"deleted":["sub/3"]}
{"modified":[],"added":[],"deleted":["sub/2","sub/3"]}