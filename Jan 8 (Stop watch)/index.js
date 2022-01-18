const timer = document.getElementById("__timer");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const lapContainer = document.querySelector(".lap--container");

const minutesNode = document.getElementById("hour");
const secondsNode = document.getElementById("minutes");
const nanosecNode = document.getElementById("seconds");

(function () {
    let minutes = 0;
    let seconds = 0;
    let nanosec = 0;
    let laps = 0;
    let t = null;

    startBtn.addEventListener("click", function () {
        if (this.classList.length < 1) {
            this.classList.add("pause");
            this.innerText = "Pause";
            resetBtn.innerText = "Lap";
            t = startTimer();
        } else {
            clearInterval(t); // pausing the timer
            this.innerText = "Start";
            resetBtn.innerText = "Reset";
            this.classList.remove("pause");
        }
    });

    // timer intially start or after pause
    function startTimer() {
        minutes = Number(minutes);
        seconds = Number(seconds);
        nanosec = Number(nanosec);

        let t = setInterval(() => {
            if (seconds === 59 && nanosec === 59) {
                seconds = 0;
                nanosec = -1;
                minutes += 1;

                minutes < 10
                    ? (minutesNode.innerText = "0" + minutes)
                    : (minutesNode.innerText = minutes);

                seconds < 10
                    ? (secondsNode.innerText = "0" + seconds)
                    : (secondsNode.innerText = seconds);
                nanosec = -1;
            } else if (nanosec === 59) {
                nanosec = -1;
                seconds += 1;

                seconds < 10
                    ? (secondsNode.innerText = "0" + seconds)
                    : (secondsNode.innerText = seconds);
            }

            ++nanosec < 10
                ? (nanosecNode.innerText = "0" + nanosec)
                : (nanosecNode.innerText = nanosec);
        }, 0);

        return t;
    }

    // add laps to the lapcontainer
    function addLap() {
        let lapDiv = document.createElement("div");

        let label1 = document.createElement("label");
        label1.innerHTML = "<b>" + ++laps + "&nbsp </b>" + " Lap";

        let timeLable = document.createElement("label");
        timeLable.innerText = timer.innerText;

        lapDiv.appendChild(label1);
        lapDiv.appendChild(timeLable);
        lapContainer.insertBefore(lapDiv, lapContainer.firstChild); // insert at first place
        // lapContainer.appendChild(lapDiv);
    }

    // remove laps will needed when resetting the timer
    function removeLaps() {
        while (lapContainer.firstChild) {
            lapContainer.removeChild(lapContainer.lastChild);
        }
    }

    // reset timer and change some text and remove laps
    function resetTimer() {
        if (this.innerText === "Lap") {
            addLap();
            return;
        }

        clearInterval(t);
        laps = 0;
        removeLaps();

        startBtn.innerText = "Start";
        startBtn.classList.remove("pause");

        minutesNode.innerText = "00";
        secondsNode.innerText = "00";
        nanosecNode.innerText = "00";

        minutes = 0;
        seconds = 0;
        nanosec = 0;
    }

    resetBtn.addEventListener("click", resetTimer);
})();
