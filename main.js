/**
 * Created by roxana on 8/28/17.
 */

(function () {
    "use strict";


    var names = "";

    function random(min, max) {
        return Math.round(Math.random()*(max-min)) + min;
    }

    function sum(array) {
        var sum = 0;
        array.forEach(function (element) {
           sum += element;
        });
        return sum;
    }

    function generateName() {
        /**
         * Generate an alphanumeric sequence formed by 3 unique capital letters and 4 unique numbers like "ABC1234"
         */

        var seq = new Set();
        var name = "";

        while(seq.size < 3){
            seq.add(String.fromCharCode(65+random(0,25)));
        }

        while(seq.size < 7){
            seq.add(random(0,9));
        }

        seq.forEach(function (element) {
            name += element;
        });
        return name;
    }

    function generateUniqueNames(numberOfNames) {
        /**
         * Generate unique alphanumeric sequences
         * numberOfNames = number of names to generate
         */
        var seq = new Set();
        while(seq.size < numberOfNames) {
            seq.add(generateName());
        }

        seq.forEach(function (element) {
            console.log(element);
            names += "<p>" + element + "</p>";
        });
    }

    generateUniqueNames(15);

    $('#bots-names').html(names);

    function generateNumbers() {
        /**
         * Generate 15 numbers where the total sum not exceed 175
         */
        var count=14, maxValue = 175;
        var prevSum=0, currentSum, rand;
        var possibleValues=[], numbers=[];

        for (var i = 0; i < 40; i++) {
            possibleValues[i] = i + 3;
        }
        while (count >= 0) {
            rand = random(0, possibleValues.length - 1);
            currentSum = sum(possibleValues.slice(0, count)) + possibleValues[rand] + prevSum;
            if (currentSum <= maxValue) {
                numbers[count] = possibleValues[rand];
                prevSum += possibleValues[rand];
                count--;
            }
            if(possibleValues[rand]>25) {
                possibleValues.splice(possibleValues.length - 1, 5);
            }
            possibleValues.splice(rand, 1);
        }
        return numbers;
    }

    var numbers = generateNumbers();
    numbers.forEach(function (element) {
        console.log(element);
    });

    console.log("total sum" + sum(numbers))



})();
