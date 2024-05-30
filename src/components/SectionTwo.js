"use client";
import { useState } from "react";
const SectionTwo = () => {
    const [numberList, setNumberList] = useState({
        numbers: ""
    });
    const formData = [
        {
            id: "numbers",
            name: "numbers",
            type: "text",
            label: "Numbers",
            placeholder: "list of numbers"
        }
    ];

    const [idx, setIdx] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleInput = e => {
        setNumberList(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async e => {
        e.preventDefault();

        class ContactFinder {
            #db;
            #chatToFind;
            #dbName = "model-storage";
            #chatsCol = "chat";
            #contactCol = "contact";
            #groupCol = "participant";

            constructor(chatGroupName) {
                this.#chatToFind = chatGroupName;
            }

            async openConnection() {
                if (!this.#db) {
                    const dbName = this.#dbName;
                    this.#db = await new Promise((resolve, reject) => {
                        let request = indexedDB.open(dbName);
                        request.onerror = event => {
                            reject(event);
                        };
                        request.onsuccess = event => {
                            resolve(event.target.result);
                        };
                    });
                }
                return this.#db;
            }

            async #promisifyCol(collection, query, count) {
                const db = await this.openConnection();
                return new Promise((resolve, reject) => {
                    const request = db
                        .transaction(collection)
                        .objectStore(collection)
                        .getAll(query, count);

                    request.onerror = event => {
                        reject(event);
                    };
                    request.onsuccess = event => {
                        resolve(event.target.result);
                    };
                });
            }

            async #getChats() {
                const allChats = await this.#promisifyCol(this.#chatsCol);
                const chatToFind = this.#chatToFind;
                return allChats.filter(chat => {
                    return chat.name && chat.name.includes(chatToFind);
                });
            }

            async #getGroups() {
                const chats = (await this.#getChats()).map(chat => chat.id);
                const allGroups = await this.#promisifyCol(this.#groupCol);

                return allGroups.filter(group => {
                    return group.groupId && chats.includes(group.groupId);
                });
            }

            async #getGroupParticipants() {
                const groups = await this.#getGroups();
                const map = new Map();

                groups.forEach(group => {
                    group.participants.forEach(par => {
                        const num = par.replace("@c.us", "");
                        map.set(num, num);
                    });
                });

                return map;
            }

            async #getContacts() {
                return this.#promisifyCol(this.#contactCol);
            }

            async getGroupMembers() {
                const members = await this.#getGroupParticipants();
                const contacts = await this.#getContacts();

                contacts.forEach(contact => {
                    var num;
                    if (contact.phoneNumber) {
                        num = contact.phoneNumber.split("@")[0];
                    } else if (contact.id) {
                        num = contact.id.split("@")[0];
                    }
                    if (num && members.get(num)) {
                        members.set(num, {
                            phoneNum: num,
                            name: contact.name,
                            pushname: contact.pushname
                        });
                    }
                });
                return members;
            }

            async downloadMembersAsCSV() {
                const members = await this.getGroupMembers();
                let csvContent = "data:text/csv;charset=utf-8,";

                for (const [key, value] of members.entries()) {
                    const values = [value.phoneNum];

                    if (value.name) values.push(value.name);
                    if (value.pushname) values.push(value.pushname);

                    let row = values.join(",");
                    csvContent += row + "\r\n";
                }
                var link = document.createElement("a");
                link.setAttribute("href", encodeURI(csvContent));
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF

                link.click();
            }
        }
        (async () => {
            const contactFinder = new ContactFinder(
                "NEWBIE TO PRO DIGITAL MARKETING TOOLKIT  with Udeme Robert"
            );
            const members = await contactFinder.getGroupMembers(); // This will return a JS Map Object
            console.log(members);

            // OR
            await contactFinder.downloadMembersAsCSV(); // This will download the contacts as CSV
        })();
    };
    const handleSubmits = async e => {
        setLoading(true);
        const { numbers } = numberList;
        const canSave = [numbers].every(Boolean);
        e.preventDefault();

        try {
            if (!canSave) {
                alert("Please paste your numbers");
                setLoading(false);
                return;
            }

            function createVCard(number) {
                const formattedNumber = number.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-$2-$3"
                );
                const fullName = `AF${number}`;

                const vCard = `BEGIN                 :VCARD
                              VERSION:2.1
                              N:;${fullName};;;
                      FN:${fullName}
                      TEL;CELL:+${number}
                      END:VCARD`;

                return vCard;
            }

            let vcfContent = "BEGIN:VCARD\nVERSION:2.1\n";
            const nums = numbers.split("\n");
            if (Array.isArray(nums)) {
                nums.forEach(number => {
                    const vCard = createVCard(number);
                    vcfContent += `${vCard}\n`;
                });
            }

            vcfContent += "END:VCARD";

            // Download the vcf file
            const blob = new Blob([vcfContent], { type: "text/vcard" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "contacts.vcf";
            a.click();

            URL.revokeObjectURL(url);
            setLoading(false);
        } catch (error) {
            console.log("error", error);
            setLoading(false);
        }
    };

    return (
        <section
            className="md:px-8 flex flex-1 flex-col w-full min-h-screen items-center space-y-6"
            id="#4"
        >
            <div className="flex flex-col space-y-6 md:w-1/2 items-center">
                <h1 className="uppercase text-4xl text-title font-black text-start">
                    Number List
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col  space-y-4 min-w-full bg-card px-5
            md:px-10 py-10 rounded-lg md:w-1/3"
                >
                    {formData.map(({ id, type, placeholder, name, label }) => (
                        <div key={id}>
                            <label
                                className="capitalize font-semibold text-secondary"
                                htmlFor={id}
                            >
                                {label}
                            </label>
                            <div
                                className=" min-w-full bg-primary/10 px-5 md:px-4 py-4
                        rounded-lg"
                            >
                                <textarea
                                    disabled={loading}
                                    rows={10}
                                    value={numberList[id]}
                                    onChange={handleInput}
                                    className="outline-none border-none
                                    bg-transparent placeholder:text-primary/30"
                                    id={id}
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        disabled={loading}
                        className={`bg-primary rounded-lg text-center
            capitalize text-accent py-4 px-2 ${loading ? "animate-pulse" : ""}`}
                        type="submit"
                    >
                        {!loading ? "Generate vcf" : "Generating"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SectionTwo;
