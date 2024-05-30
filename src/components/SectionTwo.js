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
