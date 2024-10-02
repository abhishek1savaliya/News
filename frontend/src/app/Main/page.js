import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const news = [
    {
        id: 1,
        headline: "અમદાવાદમાં ફરીથી વેપારીને લૂંટવાની ઘટના, પોલીસ તપાસમાં લાગી!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
        position: true
    },
    {
        id: 2,
        headline: "ગુજરાતના ખેડૂતોએ કરાયું પોતાનું આક્રોશ, સરકારની નીતિઓ સામે વિરોધ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter2.jpg",
        position: false
    },
    {
        id: 3,
        headline: "નવી દિલ્હી વિધાનસભામાં બજરંગ બલીના નામે વિવાદિત બોલતાવની સામે અસરકારક કાર્યવાહી!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter3.jpg",
        position: false
    },
    {
        id: 4,
        headline: "સુરતમાં રવિવારને અનોખા રોડ શોનું આયોજન, યાત્રા સજાવટ કરશે!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter4.jpg",
        position: false
    },
    {
        id: 5,
        headline: "અમદાવાદમાં ફાયરબ્રિગેડે અચાનક એક્ટિવ થઈ, આજે ઘરમાં લગાડવા માટે પરિક્ષણ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter5.jpg",
        position: false
    },
    {
        id: 6,
        headline: "ગુજરાતમાં વરસાદને કારણે પલળાઈ ગઇ છે જનજીવન, લોકોને તકલીફ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter6.jpg",
        position: false
    },
    {
        id: 7,
        headline: "મહેસાણામાં ખેડૂતોએ સરકારી નીતિઓ સામે વિરોધ દર્શાવ્યો!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter7.jpg",
        position: false
    },
    {
        id: 8,
        headline: "નવસારીમાં સ્થાનિક ફૂડ ફેસ્ટિવલનું આયોજન, લોકોએ માણ્યું સ્વાદ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter8.jpg",
        position: false
    },
    {
        id: 9,
        headline: "સુરતમાં નવી પોસ્ટ ઓફિસ ખૂલી, લોકોમાં આનંદ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter9.jpg",
        position: false
    },
    {
        id: 10,
        headline: "ગાંધીનગરમાં પરિવર્તનકારકો માટે શીખવવાની નવી સિસ્ટમ રજૂ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter10.jpg",
        position: false
    },
    {
        id: 11,
        headline: "જામનગરમાં પ્રાચીન કિલ્લાની પુનરાવૃત્તિનો પ્રયાસ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter11.jpg",
        position: false
    },
    {
        id: 12,
        headline: "સુરતમાં ફળ અને શાકભાજીની નવી મંડળી શરૂ થઈ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter12.jpg",
        position: false
    },
    {
        id: 13,
        headline: "રાજકોટમાં નવલકિશોરનો નવીન કૃષિ ટેકનોલોજી વિષે સમારોહ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter13.jpg",
        position: false
    },
    {
        id: 14,
        headline: "સૌરાષ્ટ્રમાં નવા મોસમના કપાસની ખેતી શરૂ!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter14.jpg",
        position: false
    },
    {
        id: 15,
        headline: "પાટીદાર સમૂહે નવા નેતાઓને સ્વાગત કર્યું!",
        photo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter15.jpg",
        position: false
    }
];

const Main = () => {
    return (
        <div className="p-4 sm:ml-96 sm:mr-96 bg-gray-600">
            <div className="p-4 dark:border-gray-700 mt-14">
                {news.map((article, id) => {
                    return article.position ? (
                        <Link href={`/article/${id}`}>
                            <div key={article.id} className="cursor-pointer flex flex-col h-96 mb-4 bg-gray-50 dark:bg-gray-800">
                                <Image
                                    src={article.photo}
                                    alt={article.headline}
                                    width={800}
                                    height={500}
                                    className="h-72 object-cover"
                                />
                                <p className="text-gray-800 text-lg dark:text-gray-200 p-4" style={{ letterSpacing: '0.05em' }}>
                                    {article.headline}
                                </p>
                            </div>
                        </Link>
                    ) : (
                        <Link href={`/article/${id}`}>
                            <div key={article.id} className="flex flex-col md:flex-row h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
                                <Image
                                    src={article.photo}
                                    alt={article.headline} // Better alt text for accessibility
                                    width={200}
                                    height={500}
                                    className="h-36 w-full md:w-1/3 object-cover rounded-l rounded-tr-none"
                                />
                                <p className="text-gray-800 text-lg dark:text-gray-200 p-4 flex-grow" style={{ letterSpacing: '0.05em' }}>
                                    {article.headline}
                                </p>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Main;