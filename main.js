/**
 * Created by roxana on 8/28/17.
 */

(function () {
    "use strict";

    function Bot(name, speed, strength, agility) {
        this.name = name;
        this.speed = speed;
        this.strength = strength;
        this.agility = agility;
    }

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
        var names = "";
        while(seq.size < numberOfNames) {
            seq.add(generateName());
        }

        // seq.forEach(function (element) {
        //     console.log(element);
        //     names += "<p>" + element + "</p>";
        // });
        return seq;
    }

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
        numbers.sort(function(a, b){return b - a});

        numbers.forEach(function (element) {
            console.log(element);
        });
        return numbers;
    }

    var numbers = generateNumbers();
    // numbers.forEach(function (element) {
    //     console.log(element);
    // });
    //
    // console.log("total sum" + sum(numbers));

    function createBots() {
        var bots = [];
        var names = generateUniqueNames(15);
        var it = names.values();
        var numbers = generateNumbers();
        var attr = [];  // attr[0]=speed, attr[1]=strength, attr[2]=agility;
        for(var i=0; i<numbers.length; i++) {
            for(var j=0; j<3; j++) {
                attr[j] = Math.floor(numbers[i]/3); //quotient
            }
            attr[random(0,2)] += numbers[i] % 3;  //remainder
            bots[i] = new Bot(it.next(), attr[0], attr[1], attr[2]);
            console.log(numbers[i] + ", " + attr[0]+ ", " + attr[1]+ ", " + attr[2])
        }
        return bots;
    }

    // var bots = createBots();
    // console.log(bots);


    var $starters = $('.starters');
    var $substitutes = $('.substitutes');

    function printBots() {
        var bots = createBots();
        // console.log(bots);
        var content = "", sideContent = "";

        bots.forEach(function (bot, index) {
            if(index < 10) {
                if(index === 4 || index === 5) {
                    content += '<div class="col-sm-0 col-md-1">';
                    content += '</div>';
                }
                content += '<div class="col-sm-2 col-md-2">';
                content += '<div class="robot-thumbnail">';
                content += '<h3 class="robot-name">' + bot.name.value + '</h3>';
                content += '<img src="img/starters.jpg" class="img-rounded img-responsive robot-img" alt="robot">';
                content += '<button class="btn btn-default btn-block robot-scores" role="button">Scores</button>';
                content += '</div>';
                content += '</div>';

                if(index === 1|| index === 4 || index === 7) {
                    content += '<div class="col-sm-0 col-md-4">';
                    content += '</div>';
                }
                if(index === 4 || index === 5) {
                    content += '<div class="col-sm-0 col-md-1">';
                    content += '</div>';
                }
            } else {
                sideContent += '<div class="col-sm-12 chair">';
                sideContent += '<div class="robot-thumbnail substitutes-thumbnail">';
                sideContent += '<h3 class="robot-name substitutes-name">' + bot.name.value + '</h3>';
                // sideContent += '<div class="chair">';
                sideContent += '<img src="img/substitutes.png" class="img-rounded img-responsive robot-img substitutes-img" alt="robot">';
                // sideContent += '</div>';
                sideContent += '<button class="btn btn-default btn-block robot-scores substitutes-scores" role="button">Scores</button>';
                sideContent += '</div>';
                sideContent += '</div>';
            }

        });

        $starters.html(content);
        $substitutes.html(sideContent);
    }

    printBots();




})();
