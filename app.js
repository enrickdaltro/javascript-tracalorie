// storage controller

// item controller
const ItemCtrl = (function() {
    // item constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    };

    // data state
    const state = {
        items: [],
        currentItem: null,
        totalCalories: 0
    };
    // public methods
    return {
        getItem: function() {
            return state.items;
        },
        addItem: function(name, calories) {
            // create id
            let ID;
            if (state.items.length > 0) {
                ID = state.items[state.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // calories to number
            calories = parseInt(calories);

            // create new item
            newItem = new Item(ID, name, calories);

            // add to items array
            state.items.push(newItem);

            return newItem;
        },
        logState: function() {
            return state;
        }
    };
})();

// ui controller
const UICtrl = (function() {
    // public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i></a>
                </li>
            `;
            });

            // insert list itens
            document.querySelector('#item-list').innerHTML = html;
        },
        getItemInput: function() {
            return {
                name: document.querySelector('#item-name').value,
                calories: document.querySelector('#item-calories').value
            };
        },
        addListItem: function(item) {
            //show the list
            document.querySelector('#item-list').style.display = 'block';
            // create li element
            const li = document.createElement('li');
            // add a class
            li.className = 'collection-item';
            // add ID
            li.id = `item-${item.id}`;
            // add html
            li.innerHTML = `
            <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>
            `;
            // inser item
            document
                .querySelector('#item-list')
                .insertAdjacentElement('beforeend', li);
        },
        clearInput: function() {
            document.querySelector('#item-name').value = '';
            document.querySelector('#item-calories').value = '';
        },
        hideList: function() {
            document.querySelector('#item-list').style.display = 'none';
        }
    };
})();

// app controller
const App = (function(ItemCtrl, UICtrl) {
    // load event listeners
    const loadEventListeners = function() {
        document
            .querySelector('.add-btn')
            .addEventListener('click', itemAddSubmit);
    };

    // item add submit function
    const itemAddSubmit = e => {
        const input = UICtrl.getItemInput();

        // check for name and calories input
        if (input.name !== '' && input.calories !== '') {
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // add item to ui list
            UICtrl.addListItem(newItem);
            //clear fields
            UICtrl.clearInput();
        }

        e.preventDefault();
    };

    return {
        init: function() {
            // fetch item from state
            const items = ItemCtrl.getItem();

            // check if any items
            if (items.length === 0) {
                UICtrl.hideList();
            } else {
                // populate list with itens
                UICtrl.populateItemList(items);
            }

            // load event listeners
            loadEventListeners();
        }
    };
})(ItemCtrl, UICtrl);

// initialize app
App.init();
