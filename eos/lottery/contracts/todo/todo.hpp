#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace ToDoSmartContract {
	using namespace eosio;
	using std::string;

	class ToDoContract : public contract {
		// using contract::contract;
		public:
			ToDoContract(account_name self):contract(self) {}
			//@abi action
			void create(account_name author, const uint32_t id, const string& description);

			// @abi action
			void destroy(account_name author, const uint32_t id);

			// @abi action
			void complete(account_name author, const uint32_t id);

		private:
			// @abi table todos i64
			struct todo {
				uint64_t id;
				string description;
				uint64_t completed;

				uint64_t primary_key() const { return id; }
				EOSLIB_SERIALIZE(todo, (id)(description)(completed))
			};

			typedef multi_index<N(todos), todo> todo_table;
	};
    EOSIO_ABI(ToDoContract, (create)(complete)(destroy))
}
