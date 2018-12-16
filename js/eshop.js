// Объявляем переменную в которой будем хранить массив с товарами
var goods;
var Newgoods;
var CategoriaName;
// Массив с товарами в корзине
var basket = [];



function eventSortByCostUp (e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortCostUp);
	printCatalog (Newgoods);
};
function eventSortByCostDown (e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortCostDown);
	printCatalog (Newgoods);
};
function eventSortByWeightUp(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortWeightUp);
	printCatalog (Newgoods);
};
function eventSortByWeightDown(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortWeightDown);
	printCatalog (Newgoods);
};
function eventSortByVogueUp(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortVogueUp);
	printCatalog (goods);
};
function eventSortByVogueDown(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = sort(Newgoods, sortVogueDown);
	printCatalog (Newgoods);
};

function eventfilterBefore10000(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = filt(Newgoods, filterBefore10000);
	if (Newgoods.length == 0) {
		Newgoods = filt(goods, filterBefore10000)
	};
	printCatalog (Newgoods);
};

function eventfilterMore10000(e) {
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = filt(Newgoods, filterMore10000);
	if (Newgoods.length == 0) {
		Newgoods = filt(goods, filterMore10000)
	};
	printCatalog (Newgoods);
};

function eventfilterCategoria(e) {
	CategoriaName = $(this).text();
	$(".catalog__item").remove();
	$("#ResultBasket").remove();
	Newgoods = filt(Newgoods, filterCategories);
	if (Newgoods.length == 0) {
		Newgoods = filt(goods,  filterCategories)
	};
	printCatalog (Newgoods);
};

function eventShowDiscription(e) {
	NameOfProduct = $(this).children(".catalog__item-name").text()
	$(".catalog__item").remove();
	var costOfProduct, discriptionOfProduct;
	 function collectionInfo(goods) {
		 for (var i=0; i<goods.length; i++) {
			 if (NameOfProduct == goods[i].name) {
				costOfProduct=goods[i].cost;
				discriptionOfProduct = goods[i].description;
			 }
		 }
		return costOfProduct,discriptionOfProduct;	 
	 }; 
	 collectionInfo(goods);
	 $(".catalog").prepend("<div class =\"catalog__item\"> <span class =\"catalog__item-name\">"+NameOfProduct+
	 "</span><img class =\"catalog__item-preview\" src = \"images/im1.svg\"> <span class =\"catalog__item-cost\">"+costOfProduct+
	 "</span> Описание товара:</br>"+discriptionOfProduct+"<a href=\"#\" id = \"closeDiscription\"> Закрыть </a></div>");	
	
};
// Отрисовка корзины
function eventShowBasket (e) {
	
	$(".catalog__item").remove();
	var totalWeight =0;
	var totalPrice = 0;
			for (var j=0; j<basket.length; j++) {
				totalPrice += basket[j].cost;
				totalWeight += basket[j].weight;
			};
	$(".catalog").prepend("<table id=\"ResultBasket\"><tr><td>Наименование</td><td>Категория</td><td>Вес</td><td>Цена</td><td>Удалить</td></tr></table>");
	for (var i=0; i<basket.length; i++) {
		$("tbody").append("<tr><td>"+basket[i].name+"</td><td>"+basket[i].category+"</td><td>"+basket[i].weight+
		"</td><td>"+basket[i].cost+"</td><td><a href=\"#\" id=\"DeleteFromBacket\">Х</a></td></tr>");	 
	};
	$("tbody").append("<tr><td> Общий вес товаров </td> <td>"+totalWeight+"</td> <td> На сумму </td><td>"+totalPrice+
	"</td></tr>"); 
	$("tbody").append("</br> <button> Купить </button> <a href=\"#\" id=\"closeBasket\"> Закрыть корзину </a>")
	
};


// удаление из корзины
function eventDeleteFromBacket (e) {
	NameOfProduct = $(this).parent().siblings().eq(0).text();
	for (var i=0; i<basket.length; i++) {
		
		if (NameOfProduct == basket[i].name) {
			basket.splice(i,1);
			break;
		};
	
	};
	var totalPrice = 0;
			for (var j=0; j<basket.length; j++) {
				totalPrice += basket[j].cost;
			};	
	$("#backet").text("У вас в корзине "+basket.length+" товаров на общую сумму "+totalPrice);
	$("#ResultBasket").remove();
	$("#backet").trigger("click");
};

function eventCloseBacket(e) {
	$("#ResultBasket").remove();
	printCatalog (Newgoods);
	
};



$(function(e) {
	
		
	// Очистка каталога товаров
	$(".catalog__item").remove();
	
			
	// Запрос товаров через аякс (в эту функцию вложили все функции ДОМ Контент Лоадед)
	$.post("http://r2ls.ru/", {}, function(data){
	goods = JSON.parse(data);
	Newgoods = goods;
		
		// Очистка категорий
		$(".filter__categories").children().remove();
		
		// Сортировка товаров по цене	
		// goods = sort(goods, sortCostUp);
		// Вывод каталога товаров	
		printCatalog (goods);
		
		// Вывод категорий товаров
		getCategories ();
		// Сортировка цены от меньшей к большей
		$("#CostUp").click(eventSortByCostUp); 
		// Сортировка по цене от большей к меньшей	
		$("#CostDown").click(eventSortByCostDown); 
		// Сортировка по весу от меньшего большему
		$("#WeightUp").click(eventSortByWeightUp); 
		// Сортировка по весу от большего к меньшему
		$("#WeightDown").click(eventSortByWeightDown); 
		// Сортировка по популярности от меньшей к большей
		$("#VogueUp").click(eventSortByVogueUp); 
		// Сортировка по популярности от большей к меньшей
		$("#VogueDown").click(eventSortByVogueDown); 

		// Сортировка фильтрации меньше 10 000
		$("#less_10000").click(eventfilterBefore10000); 	
	
		// Сортировка фильтрации больше 10 000
		$("#more_10000").click(eventfilterMore10000); 

		// Сортировка по категориям
		$(".categoriaName").click(eventfilterCategoria); 
	
		// Сброс всех фильтров
		$("#resetFilter").click(resetFilter); 
	
	
	
		// Отрицовка информации о товаре
		$(document).on('click','.catalog__item', eventShowDiscription); 
	
		// добавление в корзину
	 
		$(document).on('click','#addBasket', function(event){
			event.stopPropagation();
			NameOfProduct = $(this).parent().children(".catalog__item-name").text()
			for (var i=0; i<goods.length; i++) {
				var val = goods[i];
				if (NameOfProduct == goods[i].name) {
					basket.push(val);
				
				}
			}
			var totalPrice = 0;
			for (var j=0; j<basket.length; j++) {
				totalPrice += basket[j].cost;
			};
		 $("#backet").text("У вас в корзине "+basket.length+" товаров на общую сумму "+totalPrice);
		}); 
	 
	// Отрисовка корзины
		$("#backet").click(eventShowBasket); 
	// Удаление из корзины 	
	$(document).on('click','#DeleteFromBacket', eventDeleteFromBacket);	
	
	// Закрытие корзины 	
	$(document).on('click','#closeBasket', eventCloseBacket);	
	// Закрытие описания товара
	$(document).on('click','#closeDiscription',function(event){
			event.stopPropagation();
			$(".catalog__item").remove();
			printCatalog (Newgoods);
			
					
	});
	
	});

});	
	 
		
		
	// Функия вывода категорий из массива
	function getCategories () {
		var arr = []; 
		var data = 0;
		 goods.forEach(function (el) {
			if (arr[el.category] == undefined) {
				arr[el.category] = 1;
			} else {
				arr[el.category] ++;
			}
		 });
		for (key in arr) {
			data = ++data;
			var ul = $(".filter__categories");
			ul.append('<li class="feed-container"><a href="#"><span class="categoriaName">'+key+
			'</span></a><span class="badge">'+arr[key]+'</span></li>');
				
		};
	};
	
	// Функция сортировки товаров по цене
	function sortCostUp(a,b) {
		return a.cost < b.cost;
	};
	// Функция сортировки товаров по цене (от большего к меньшему)
	function sortCostDown(a,b) {
		return a.cost > b.cost;
	};
	// Функция сортировки товаров по весу (от меньшего к большему)
	function sortWeightUp(a,b) {
		return a.weight < b.weight;
	};
	// Функция сортировки товаров по весу (от большего к меньшему)
	function sortWeightDown(a,b) {
		return a.weight > b.weight;
	};
	// Функция сортировки товаров по популярности (от меньшей к большему)
	function sortVogueUp(a,b) {
		return a.vogue < b.vogue;
	};
	// Функция сортировки товаров по популярности (от большей к меньшему)
	function sortVogueDown(a,b) {
		return a.vogue > b.vogue;
	};
	
	// Функция фильтра до 10 000
	function filterBefore10000(a) {
		return a.cost < 10000;
	};
	
	// Функция фильтра больше 10 000
	function filterMore10000(a) {
		return a.cost > 10000;
	};
	
	// Функция фильтра по категориям
	function filterCategories(a) {
		return a.category == CategoriaName;
	};
	
	// Функция сброса фильторов и сортировки
	function resetFilter() {
		$("#ResultBasket").remove();
		$(".catalog__item").remove();
		printCatalog (goods);
		
	};
	
	
	// Вывод каталога товаров
	function printCatalog (gds) {	
		for (i=0; i<gds.length; i++) {
		$(".catalog").prepend("<div class =\"catalog__item\"> <span class =\"catalog__item-name\">"+gds[i].name+
		"</span><img class =\"catalog__item-preview\" src = \"images/im1.svg\"> <span class =\"catalog__item-cost\">"+gds[i].cost+
		"</span> <span id=\"addBasket\"><a href=\"#\">+</a></span> </div>");	
		
		 }
		};
		
	
	// Функция сортировки
	function sort(arr,rule) {
		for(var i=0; i< arr.length; i++) {
			for (j=i+1;  j< arr.length; j++) {
				if (!rule(arr[i],arr[j])) {
					var a = arr[i];
					arr[i] = arr[j];
					arr[j] = a;
				}
			}
		}
		return arr;
	};
	
	// Функция фильтраии
	function filt(arr,condition) {
		var result = [];
		for(var i=0; i< arr.length; i++) {
			var val = arr[i]
			if (condition(val)) {
				result.push(val);
			}
		}
		console.log(result);
		return result;
	};

	
