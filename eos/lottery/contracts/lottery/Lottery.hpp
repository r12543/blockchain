#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <string>

namespace CipherZ {
    using namespace eosio;
    using std::string;

    class Lottery : public contract {
        using contract::contract;
        
        public:
            Lottery(account_name self):contract(self) {}

            //@abi action
            void addstudent(const account_name account, uint64_t ssn, string firstname, string lastname, uint64_t grade);

            //@abi action
            void addgrade(const account_name account, uint64_t grade_num, uint64_t openings);

            //@abi action
            void getstudent(const account_name account, const uint64_t ssn);

            //@abi action
            void remstudent(const account_name account, const uint64_t ssn);

            //@abi action
            void remgrade(const account_name account, const uint64_t grade_num);

            //@abi action
            void getgrade(const account_name account, uint64_t grade_num);

            //@abi action
            void getstudents(const account_name account);

            //@abi action
            void getgrades(const account_name account);

            //@abi action
            void runlottery(account_name account);

        private:

            //@abi table student i64
            struct student {
                uint64_t account_name;
                uint64_t ssn;
                string firstname;
                string lastname;
                uint64_t grade;
                uint64_t result;

                uint64_t primary_key() const { return ssn; }
                uint64_t grade_key() const { return grade; }
                uint64_t parent_key() const { return account_name; }

                EOSLIB_SERIALIZE(student, (account_name)(ssn)(firstname)(lastname)(grade)(result));
            };

            typedef multi_index<N(student), student, 
            indexed_by<N(bygrade), const_mem_fun<student, uint64_t, &student::grade_key>>,
            indexed_by<N(byparent), const_mem_fun<student, uint64_t, &student::parent_key>>> studentMultiIndex;

            //@abi table grade i64
            struct grade {
                uint64_t account_name;
                uint64_t grade_num;
                uint64_t openings;
                uint64_t applicants;

                uint64_t primary_key() const { return grade_num; }

                EOSLIB_SERIALIZE(grade, (account_name)(grade_num)(openings)(applicants))
            };

            typedef multi_index<N(grade), grade> gradeIndex;
    };

    EOSIO_ABI(Lottery, (addstudent)(addgrade)(getstudents)(getgrades)(getstudent)(getgrade)(runlottery)(remstudent)(remgrade));
}