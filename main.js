// var puts variable directly to the Global scope by default
// both date should be in dd-mm-yyyy format.
// have to find out which date will result in the lest amount of refund money
// so if i save a day that means except that day all other day has to be refunded ,
// to minimize business loss i have to save one day which  will results to least amount of
// refund money given to customers ==> means select the day wich has the most sale so giving
// less refund money .  your task is to minimize this overall refund cost.
// Key Takeaway
// The task requires you to compare the refund money for
//  all other dates when a specific day is saved.
//  This is why you calculate refund money for orders associated with all dates
//  except the one you choose to save.

var url, startDate, endDate;
