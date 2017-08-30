/**
 * Created by roxana on 8/28/17.
 */

(function () {
    "use strict";

    var $starters = $('.starters');
    var $substitutes = $('.substitutes');
    var bots;


    function Bot(name, speed, strength, agility) {
        this.name = name;
        this.speed = speed;
        this.strength = strength;
        this.agility = agility;
    }


    function createBots() {
        var bots = [];
        var names = generateAlphanumericSequences(15);
        var it = names.values();
        var numbers = generateScoreAttributes();
        var attr = [];  // attr[0]=speed, attr[1]=strength, attr[2]=agility;
        for(var i=0; i<numbers.length; i++) {
            for(var j=0; j<3; j++) {
                attr[j] = Math.floor(numbers[i]/3); //quotient
            }
            attr[random(0,2)] += numbers[i] % 3;  //remainder
            bots[i] = new Bot(it.next(), attr[0], attr[1], attr[2]);
            // console.log(numbers[i] + ", " + attr[0]+ ", " + attr[1]+ ", " + attr[2]);
        }

        console.log(bots);
        return bots;
    }


    function generateAlphanumericSequences(numberOfSequences) {
        /**
         * Generate N unique alphanumeric sequences, where N = numberOfSequences
         */
        var seq = new Set();
        var names = "";
        while(seq.size < numberOfSequences) {
            seq.add(generateOneAlphanumericSequence());
        }
        return seq;
    }


    function generateOneAlphanumericSequence() {
        /**
         * Generate one alphanumeric sequence formed by 3 unique capital letters and 4 unique numbers like "ABC1234"
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


    function generateScoreAttributes() {
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


    function printBots() {
        bots = createBots();
        var content = "", sideContent = "";
        var totalScore;

        bots.forEach(function (bot, index) {
            totalScore = bot.speed + bot.strength + bot.agility;
            if(index < 10) {
                if(index === 4 || index === 5) {
                    content += '<div class="col-sm-0 col-md-1">';
                    content += '</div>';
                }
                content += '<div class="col-sm-2 col-md-2">';
                content += '<div class="robot-thumbnail">';
                content += '<h3 class="robot-name">' + bot.name.value + '</h3>';
                content += '<img src="img/starters.jpg" class="img-rounded img-responsive robot-img" alt="robot">';
                content += '<button type="button" class="btn btn-default btn-block robot-scores" data-container="body" ' + 'data-toggle="popover"' +
                           ' data-placement="bottom" data-content="Speed: ' + bot.speed + ", " + 'Strength: ' + bot.strength +
                           ", " + 'Agility: ' + bot.agility + '">Total Score: ' + totalScore + '</button>';
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
                sideContent += '<div class="chair">';
                sideContent += '<div class="robot-thumbnail substitutes-thumbnail">';
                sideContent += '<h3 class="robot-name substitutes-name">' + bot.name.value + '</h3>';
                sideContent += '<img src="img/substitutes.png" class="img-rounded img-responsive robot-img substitutes-img" alt="robot">';
                sideContent += '<button type="button" class="btn btn-default btn-block robot-scores substitutes-scores" data-container="body" ' +
                               'data-toggle="popover" data-placement="bottom" data-content="Speed: ' + bot.speed + ", " + 'Strength: ' + bot.strength +
                               ", " + 'Agility: ' + bot.agility + '">Score: ' + totalScore + '</button>';
                sideContent += '</div>';
                sideContent += '</div>';
            }

        });

        $starters.html(content);
        $substitutes.html(sideContent);
    }


    printBots();


    $('.links').click(function () {
        location.reload();
    });


})();
