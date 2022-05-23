# Help Me Unpack

|             |                                                 |
|-------------|-------------------------------------------------|
| Title       | Help Me Unpack                                  |
| Solved Date | 22-05-2022                                      |
| Problem Url | https://hackattic.com/challenges/help_me_unpack |

# Description

The challenge involves extracting some numbers from the base64-encoded data. The point to note here is that, even though the data is provided as a base64 string the underlying binary data remains the same. So we can directly start working by converting the base64 encoded string into binary and start reading the numbers.

According to the problem description the following are the numbers that needs to be extracted:
- Signed Integer
- Unsigned Integer
- Short
- Float
- Double
- Double (Big Endian)

# Quick refreshers

## Size of each datatype

It is also mentioned in the challenge that the int is of 4bytes and all sizes are according to 32-bit platform.

| Datatype            | Size in Bytes |
|---------------------|---------------|
| Int                 | 4             |
| UInt                | 4             |
| Short               | 4             |
| Float               | 4             |
| Double              | 8             |
| Double (Big Endian) | 8             |

## What is Big Endian?

There are two ways of storing binary information in computers:
- Big Endian
- Little Endian

In machines that use Big Endian store the first byte first in memory. where as in Little Endian it's opposit, the first byte of data is stored last in the memory. The following illustrations should sum it up.

![Source: [Level Up Coding](https://levelup.gitconnected.com/little-endian-vs-big-endian-eb2a2c3a9135)](https://miro.medium.com/max/1262/1*lYhlPj4s2H2JoFpvKdjxbw.png)
![Source: [Level Up Coding](https://levelup.gitconnected.com/little-endian-vs-big-endian-eb2a2c3a9135)](https://miro.medium.com/max/1386/1*DHeD_BKY61AW8jqBX5vVmA.png)

Most general purpose computers are Little Endian, so assume and parse bytes according to Little Endian format.

# Solution

To work with binary data, nodejs has a Buffer class. The Buffer class provides us with methods which makes it easier to manipulate, store, operate on binary data.

- First generate a buffer from the provided base64 string.
```js
  let buff = Buffer.from(data, "base64")
```
`data` here is the base64 data provided for the challenge.

- Use the slice method on the Buffer class to separate the numbers that we are supposed to read.
```js
  buff.slice(0,4) // slices down 4 bytes from offset 0
  buff.slice(4,8) // slices 4 bytes from offset 4
```

- Use data type specific read methods to read the respective bytes:

| Method              | Datatype    |
|---------------------|-------------|
| Buffer.readInt32LE  | int         |
| Buffer.readUInt32LE | uint        |
| Buffer.readInt32LE  | short       |
| Buffer.readFloatLE  | float       |
| Buffer.readDoubleLE | double      |
| Buffer.readDoubleBE | double (BE) |

- The final JSON looks like below
```js
{
  int: buff.slice(0,4).readInt32LE(0),
  uint: buff.slice(4,8).readUInt32LE(0),
  short: buff.slice(8, 12).readInt32LE(0),
  float: buff.slice(12, 16).readFloatLE(0),
  double: buff.slice(16, 24).readDoubleLE(0),
  big_endian_double: buff.slice(24, 32).readDoubleBE(0),
}
```