/**
 * Created by User on 20.11.2018.
 */
function getDescription() {
    return "Dgdf dg dfgdfg dfg.";
}

function newGood(n) {
    return {
        name: 'G' + n,
        category: 'C' + Math.ceil(Math.random() * 5),
        cost: Math.ceil(Math.random() * 20) * 1000,
		weight: Math.ceil(Math.random() * 20),
        vogue: Math.ceil(Math.random() * 100),
        description: getDescription(Math.ceil(Math.random() * 5))
    }
}
goods = [];
for(var i = 0; i < 20; i++)
    goods.push(newGood(i))
