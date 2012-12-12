//in
[
    "mkdir tmp",
    "INIT",
    "touch tmp/1",
    "COMMIT",
    "GET_VERSION",
    "touch tmp/2",
    "CHECK_VERSION",
    "COMMIT",
    "CHECK_VERSION",
    "rm -rf tmp"
]
//out
same
different