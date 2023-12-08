let tableRead1 = [];
let tableRead2 = [];
let tableRead3 = [];
let tableRead4 = [];
let tableRead5 = [];
let probabilityFirst = 0;
let errortype;
let errorProbability = 0;
let N = 0;
let histogramChart = null;

//#region Обновление таблиц
function changeTable(table, routes1, routeLength) {
    const currentRowCount = table.rows.length;
    const currentColumnCount = table.rows[0].cells.length;

    if (routes1 > currentRowCount) {
        for (let i = currentRowCount; i < routes1; i++) {
            const row = table.insertRow();
            for (let j = 0; j < routeLength; j++) {
                const cell = row.insertCell();
                cell.contentEditable = true;
                cell.textContent = '';
            }
        }
    } else if (routes1 < currentRowCount) {
        while (table.rows.length > routes1) {
            table.deleteRow(table.rows.length - 1);
        }
    }

    const rowCount = table.rows.length;

    for (let i = 0; i < rowCount; i++) {
        const currentColumnCount = table.rows[i].cells.length;

        if (routeLength > currentColumnCount) {
            for (let j = currentColumnCount; j < routeLength; j++) {
                const cell = table.rows[i].insertCell();
                cell.contentEditable = true;
                cell.textContent = '';
            }
        } else if (routeLength < currentColumnCount) {
            while (table.rows[i].cells.length > routeLength) {
                table.rows[i].deleteCell(table.rows[i].cells.length - 1);
            }
        }
    }
}
//#endregion
//#region Создание таблиц
function createTable() {
    const routes1 = document.getElementById('routes1').value;
    const routes2 = document.getElementById('routes2').value;
    const routeLength = document.getElementById('routeLength').value;

    if (routes1 < 1 || routes2 < 1){
        alert("Количество маршрутов не может быть меньше 1");
        return;
    }

    if (routeLength < 1){
        alert("Длина маршрутов не может быть меньше 1");
        return;
    }

    if (routeLength > 7){
        alert("Длина маршрутов не может быть больше 7");
        return;
    }

    const tablesContainer = document.getElementById('tables');
   // tablesContainer.innerHTML = ''; 

    
    const table1 = document.getElementById('table1');

if (table1) {
    changeTable(table1, routes1, routeLength);

} else {
    
    const newTable1 = document.createElement('table');
    newTable1.setAttribute('id', 'table1'); 
    for (let i = 0; i < routes1; i++) {
        const row = newTable1.insertRow();
        for (let j = 0; j < routeLength; j++) {
            const cell = row.insertCell();
            cell.contentEditable = true; 
            cell.textContent = ''; 
        }
    }
    const tableCaption = document.createElement('caption');
    tableCaption.textContent = 'Матрица маршрутов 1';
    tablesContainer.appendChild(tableCaption);
    tablesContainer.appendChild(newTable1);
}

const table2 = document.getElementById('table2');

if (table2) {
    changeTable(table2, routes2, routeLength);
}
else{
    
    const table2 = document.createElement('table');
    table2.setAttribute('id', 'table2'); 
    for (let i = 0; i < routes2; i++) {
        const row = table2.insertRow();
        for (let j = 0; j < routeLength; j++) {
            const cell = row.insertCell();
            cell.contentEditable = true; 
            cell.textContent = ''; 
        }
    }
    const tableCaption = document.createElement('caption');
    tableCaption.textContent = 'Матрица маршрутов 2';
    tablesContainer.appendChild(tableCaption);
    tablesContainer.appendChild(table2);
}


const table3 = document.getElementById('table3');
if(table3){
    changeTable(table3, routeLength, 2);
}
else {
const table3 = document.createElement('table');
table3.setAttribute('id', 'table3'); 
for (let i = 0; i < routeLength; i++) {
    const row = table3.insertRow();
    for (let j = 0; j < 2; j++) {
        const cell = row.insertCell();
        cell.contentEditable = true; 
        cell.textContent = ''; 
    }
}

const tableCaption = document.createElement('caption');
tableCaption.textContent = 'Матрица времени';
tablesContainer.appendChild(tableCaption);
tablesContainer.appendChild(table3);
}

const table4 = document.getElementById('table4');
if(table4){
    changeTable(table4, routes1, 1);
}
else {
const table4 = document.createElement('table');
table4.setAttribute('id', 'table4'); 
for (let i = 0; i < routes1; i++) {
    const row = table4.insertRow();
    for (let j = 0; j < 1; j++) {
        const cell = row.insertCell();
        cell.contentEditable = true; 
        cell.textContent = ''; 
    }
}

const tableCaption = document.createElement('caption');
tableCaption.textContent = 'Матрица вероятностей 1 подтемы';
tablesContainer.appendChild(tableCaption);
tablesContainer.appendChild(table4);
}


const table5 = document.getElementById('table5');
if(table5){
    changeTable(table5, routes2, 1);
}
else {
const table5 = document.createElement('table');
table5.setAttribute('id', 'table5'); 
for (let i = 0; i < routes2; i++) {
    const row = table5.insertRow();
    for (let j = 0; j < 1; j++) {
        const cell = row.insertCell();
        cell.contentEditable = true; 
        cell.textContent = ''; 
    }
}

const tableCaption = document.createElement('caption');
tableCaption.textContent = 'Матрица вероятностей 2 подтемы';
tablesContainer.appendChild(tableCaption);
tablesContainer.appendChild(table5);
}
}
//#endregion
//#region Чтение данных
function readTable(tableId, dataArray) {
    const table = document.getElementById(tableId);
    if (table) {
        for (let i = 0; i < table.rows.length; i++) {
            const rowData = [];
            for (let j = 0; j < table.rows[i].cells.length; j++) {
                rowData.push(table.rows[i].cells[j].textContent);
            }
            dataArray.push(rowData);
        }
    }
}



    function read(){
        tableRead1.length = 0;
        tableRead2.length = 0;
        tableRead3.length = 0;
        tableRead4.length = 0;
        tableRead5.length = 0;

        readTable("table1", tableRead1);
        readTable("table2", tableRead2);
        readTable("table3", tableRead3);
        readTable("table4", tableRead4);
        readTable("table5", tableRead5);

        const tableArrays1 = [tableRead1, tableRead2, tableRead3, tableRead4, tableRead5];
        for (let i = 0; i < tableArrays1.length; i++) {
            const tableArray1 = tableArrays1[i];
    
            if (tableArray1.length === 0) {
                alert(`Ошибка: Таблица ${i + 1} пуста`);
                return false; 
            }
        }

        const tableArrays = [tableRead1, tableRead2];
    for (let i = 0; i < tableArrays.length; i++) {
        const tableArray = tableArrays[i];

        for (let j = 0; j < tableArray.length; j++) {
            const rowData = tableArray[j];

            
            if (rowData.length > 0 && rowData[0] !== "1") {
                alert(`Ошибка: Строка ${j + 1} в таблице ${i + 1} не начинается с "1"`);
                return false; 
            }
        }
    }


        probabilityFirst = document.getElementById('probability').value;
        if (!(parseFloat(probabilityFirst) >= 0 && parseFloat(probabilityFirst) <= 1) || typeof parseFloat(probabilityFirst) !== 'number' || isNaN(probabilityFirst)) {
            alert("Вероятность первой подтемы записана неверно");
            return false;
        }
        errortype = document.getElementById('errortype').value;
        errorProbability = document.getElementById('errorProbability').value;
        if (!(parseFloat(errorProbability) >= 0 && parseFloat(errorProbability) <= 1) || typeof parseFloat(errorProbability) !== 'number' || isNaN(errorProbability)) {
            alert("Вероятность ошибки записана неверно");
            return false;
        }
        N = document.getElementById("n").value;
        if(parseFloat(N) < 0 || !(/^\d+$/.test(parseFloat(N)))){
            alert("Количество итераций записано неверное");
            return false;
        }

/*console.log(tableRead1); 
console.log(tableRead2); 
console.log(tableRead3); 
console.log(tableRead4); 
console.log(tableRead5); 
console.log(probabilityFirst); 
console.log(errortype); 
console.log(errorProbability); 
console.log(N); */
return true;
    }


//#endregion
//#region Первая лаба
function calculateAverage(arr) {
    if (arr.length === 0) {
        return 0;
    }

    const sum = arr.reduce((acc, val) => acc + parseFloat(val), 0);
    return sum / arr.length || 0;
}

function sum(arr){
    if (arr.length === 0) {
        return 0;
    }

    return arr.reduce((acc, val) => acc + parseFloat(val), 0);
}

function Algorithm(){
    if (!read()) {
        return; 
    }
    let firstTime = [];
    let SecondTime = [];
    for(let i = 0; i < N; i++){
        var probability = Math.random();
        if(probability > probabilityFirst){
            var currentTable = tableRead2;
            var currentTableProbability = tableRead5;
            firstTime.push(ImitationModel(currentTable, currentTableProbability, errortype, errorProbability, tableRead3).totalTime)
        }
        else {
            var currentTable = tableRead1;
            var currentTableProbability = tableRead4;
            SecondTime.push(ImitationModel(currentTable, currentTableProbability, errortype, errorProbability, tableRead3).totalTime)
        }
    }
    //alert("Среднее время подтемы 1:" + calculateAverage(firstTime) + "\n" + "Среднее время подтемы 2:" + calculateAverage(SecondTime) + "\n" + "Общее время:" + (sum(firstTime) + sum(SecondTime)));
    const averageTime1 = document.getElementById('averageTime1');
    averageTime1.textContent = `Среднее время подтемы 1: ${calculateAverage(firstTime)}`;

    const averageTime2 = document.getElementById('averageTime2');
    averageTime2.textContent = `Среднее время подтемы 2: ${calculateAverage(SecondTime)}`;

    const totalTime = document.getElementById('totalTime');
    totalTime.textContent = `Общее время: ${sum(firstTime) + sum(SecondTime)}`;
    
    let firstTime1 = firstTime.map(value => parseFloat(value));
    let secondTime1 = SecondTime.map(value => parseFloat(value));
    let combinedData = firstTime1.concat(secondTime1).map(Number);
    createHistogram(combinedData);
}

function chooseProbabilityIndex(probabilities) {
    var totalWeight = Object.values(probabilities).reduce((acc, val) => acc + parseFloat(val), 0);
    let random = Math.random() * totalWeight;
    console.log('Random number:', random);
    console.log('Total weight:', totalWeight);

    let index = 0;
    for (const [probability, weight] of Object.entries(probabilities)) {
        index++;
        if (random < parseFloat(weight)) {
            return index - 1;
        }
        random -= parseFloat(weight);
    }
    return -1; 
}

function ImitationModel(currentTable, currentTableProbability, errortype, errorProbability, TimesTable){
    var currentRoute = 0;
    currentRoute = chooseProbabilityIndex(currentTableProbability);
    const routeMatrix = new RouteMatrix(currentTable, TimesTable);
    var mistakenNodes = 0;
    let currentNode = 0;
    let i = 0;

    while (i < currentTable[currentRoute].filter(Boolean).length) {
        console.log(currentTable[currentRoute].filter(Boolean).length);
        const previousNode = currentNode;
        //console.log(`Step ${i + 1}: Route ${currentRoute + 1}, Node ${currentTable[currentRoute][currentNode]}, `);

        if (mistakenNodes > 0) {
            currentNode = routeMatrix.makeTransition(currentRoute, currentNode, true);
            mistakenNodes--;
        } else {
            currentNode = routeMatrix.makeTransition(currentRoute, currentNode, false);
        }

        if (Math.random() < errorProbability && currentNode !== currentTable[currentRoute].length - 1) {
            switch (errortype) {
                case 'repeat':
                    currentNode = previousNode;
                    i = previousNode;
                    mistakenNodes = 1;
                    break;
                case 'makeastep':
                    currentNode = previousNode - 1;
                    if (currentNode < 0) {
                        currentNode = 0;
                    }
                    i = currentNode;
                    mistakenNodes = 2;
                    break;
                case 'startagain':
                    mistakenNodes = currentNode;
                    currentNode = 0;
                    i = 0;
                    break;
                default:
                    break;
            }
        } else {
            i++;
        }
    }
    return routeMatrix;
}


class RouteMatrix {
    constructor(routeMatrix, times) {
        this.routes = routeMatrix;
        this.times = times;
        this.totalTime = 0;
        this.mistakenTime = 0;
        this.random = Math.random;
    }

    getThisRoute(currentRoute, currentNode) {
        if (currentRoute < 0 || currentRoute >= this.routes.length) {
            throw new Error('Invalid currentRoute');
        }

        const nextRoute = this.routes[currentRoute];
        const timeSpent = this.times[nextRoute[currentNode] - 1];
        return {
            nextRoute,
            timeSpent,
        };
    }

    makeTransition(currentRoute, currentNode, mistake) {
        const { nextRoute, timeSpent } = this.getThisRoute(currentRoute, currentNode);

        let timeStart = parseFloat(timeSpent[0]);
        let timeEnd = parseFloat(timeSpent[1]);

        let currTime;
        if (timeEnd === 0) {
            currTime = timeStart;
        } else {
            currTime = timeStart + this.random() * (timeEnd - timeStart);
        }

        this.totalTime += currTime;
        if (mistake) {
            this.mistakenTime += currTime;
        }

        if (currentNode + 1 < nextRoute.length) {
            return currentNode + 1;
        } else {
            return currentNode;
        }
    }
}



function createHistogram(combinedData) {
    const ctx = document.getElementById('histogramChart').getContext('2d');
    const canvasElement = document.getElementById('histogramChart')


    
    if (histogramChart) {
        histogramChart.destroy();
    }

    const min = Math.min(...combinedData);
    const max = Math.max(...combinedData);

    
    const K = Math.ceil(1 + 3.22 * Math.log10(combinedData.length));

    
    const intervalWidth = (max - min) / K;
    const intervals = [];
    for (let i = 0; i < K; i++) {
        intervals.push(min + i * intervalWidth);
    }

    
    const data = [];
    for (let i = 0; i < K - 1; i++) {
        const intervalData = combinedData.filter(value => {
            return (value >= intervals[i] && value < intervals[i + 1]);
        }).length;
        data.push(intervalData);
    }

    const chartData = {
        labels: intervals.slice(0, -1).map(String),
        datasets: [{
            label: 'Interval Data',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            data: data
        }]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        options: {
            indexAxis: 'x',
            scales: {
                y: {
                    beginAtZero: true
                }
            },           
        }
    };

    histogramChart = new Chart(ctx, chartConfig);
}
//#endregion

//#region Вторая лаба

function Lab2(){
    if (!read()) {
        return; 
    }
    let lambda1 = parseFloat(document.getElementById('lambda1').value);
    let lambda2 = parseFloat(document.getElementById('lambda2').value);
    let failTime = 0;
    let totalDelayTime = 0;
    let totalTimeRecover = 0;
    let totalTime = 0;
    for (let i = 0; i < N; i++) {
        failTime = -Math.log(Math.random()) / lambda2;
        totalTime += failTime;
        totalDelayTime += Modeling(failTime, lambda1);
        totalTimeRecover += ImitationModel(tableRead2, tableRead5, errortype, errorProbability, tableRead3).totalTime;
    }

    let price1 = parseFloat(document.getElementById('P1').value);
    let price2 = parseFloat(document.getElementById('P2').value);
    let sum = (price1 * totalDelayTime + price2 * totalTimeRecover) / (totalTime + totalTimeRecover);


    const totalDelayTimePin = document.getElementById('totalDelayTime');
    totalDelayTimePin.textContent = `Время задержек: ${totalDelayTime}`;

    const totalTimeRecoverPin = document.getElementById('totalTimeRecover');
    totalTimeRecoverPin.textContent = `Время восстановления: ${totalTimeRecover}`;
    const sumresult = document.getElementById('model');
    sumresult.textContent = `Коэффициент равен: ${sum}`;
}



function Modeling(modelingTime, lambda){
    
        let currentTime = 0.0;
        let totalServingTime = 0;
        let totalMistakenTime = 0;
        let arrivalTimes = [];
        let serviceCompletionTime = Number.POSITIVE_INFINITY;
        let isBusy = false;
    
        while (currentTime < modelingTime) {
            let interarrivalTime = -Math.log(Math.random()) / lambda;
            arrivalTimes.push(currentTime + interarrivalTime);
    
            if (arrivalTimes.length > 0 && currentTime >= arrivalTimes[0]) {
                arrivalTimes.shift();
    
                if (currentTime >= serviceCompletionTime && serviceCompletionTime < modelingTime) {
                    isBusy = false;
                }
    
                if (!isBusy) {
                    let run = ImitationModel(tableRead1, tableRead4, errortype, errorProbability, tableRead3);
                    let serviceTime = run.totalTime;
                    totalMistakenTime += run.mistakenTime;
                    serviceCompletionTime = currentTime + serviceTime;
                    isBusy = true;
    
                    if (serviceCompletionTime < modelingTime) {
                        totalServingTime += serviceTime;
                    }
                }
            }
            currentTime = arrivalTimes[0];
        }
        return totalMistakenTime;
}

//#endregion