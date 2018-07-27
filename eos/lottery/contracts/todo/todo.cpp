#include "todo.hpp"

namespace ToDoSmartContract {
	void ToDoContract::create(account_name author, const uint32_t id, const string& description) {
        todo_table todos(_self, _self);
        todos.emplace(author, [&](auto& new_todo) {
            new_todo.id  = id;
            new_todo.description = description;
            new_todo.completed = 0;
        });

        print("todo#", id, " created");
    }

    // @abi action
    void ToDoContract::destroy(account_name author, const uint32_t id) {
        todo_table todos(_self, _self);
        auto todo_lookup = todos.find(id);
        todos.erase(todo_lookup);

        print("todo#", id, " destroyed");
    }

    // @abi action
    void ToDoContract::complete(account_name author, const uint32_t id) {
        todo_table todos(_self, _self);
        auto todo_lookup = todos.find(id);
        eosio_assert(todo_lookup != todos.end(), "Todo does not exist");

        todos.modify(todo_lookup, author, [&](auto& modifiable_todo) {
                modifiable_todo.completed = 1;
        });

        print("todo#", id, " marked as complete");
    }
}
