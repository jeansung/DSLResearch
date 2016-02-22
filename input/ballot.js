window.addEvent('domready', function () {

    new Tangle(document.getElementById("ballotExample"), {

        initialize: function () {
            this.myHouseValue = 750000;
            this.levyPerHouse = 25;
            this.averageHouseValue = 750000;
            this.numYears = 5;
            this.percentParticipating = 100;

            // Assumed constants 
            this.numHouses = 50000;
            this.perAmount = 1000;
        },
        
        update: function () {
            this.myPayment = (this.myHouseValue / this.perAmount) * (this.levyPerHouse / 100);
            this.totalAmountRaised = (this.averageHouseValue / this.perAmount) * this.numHouses * (this.percentParticipating / 100) * this.numYears;
        },
    });

});
