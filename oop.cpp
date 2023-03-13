#include <iostream>
#include <string>
#include <vector>

using namespace std;

class make_model
{
    const static int totalM = 2;
    string make_modelS[totalM] = {"Mercedes/S Class", "Dodge/Charger"};

    int make_model_choice;
    string this_make;

public:
    make_model()
    {
        make_model_choice = 0;
        this_make = "";
    }

    string getMake() const { return this->this_make; }
    string selectModel()
    {
        for (int i = 0; i < totalM; i++)
        {
            cout << i + 1 << ". " << make_modelS[i] << endl;
        }

        cin >> make_model_choice;
        while (make_model_choice < 1 && make_model_choice > totalM)
        {
            cout << "Invalid Option." << endl;
            cin >> make_model_choice;
        }
        this_make = make_modelS[make_model_choice-1];
        return this_make;
    }
};

class Body_Type
{
    const static int typeT = 3;

    string type[typeT] = {"Sedan", "SUV", "Hatchback"};

    int type_choice;
    string this_type;

public:
    Body_Type()
    {
        type_choice = 0;
        this_type = "";
    }

    string getType() const { return this_type; }
    string selectType()
    {
        for (int i = 0; i < typeT; i++)
        {
            cout << i + 1 << ". " << type[i] << endl;
        }

        cin >> type_choice;
        while (type_choice < 1 && type_choice > typeT)
        {
            cout << "Invalid Option." << endl;
            cin >> type_choice;
        }

        this_type = type[type_choice-1];
        return this_type;
    }
};

class Engine
{
    const static int totalE = 8;

    string engines[totalE] = {"V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"};
    int e_choice;
    string this_en;

public:
    Engine()
    {
        e_choice = 0;
        this_en = "";
    }

    string getEn() const { return this_en; }
    string selectEngine()
    {
        for (int i = 0; i < totalE; i++)
        {
            cout << i + 1 << ". " << engines[i] << endl;
        }

        cin >> e_choice;
        while (e_choice < 1 && e_choice > totalE)
        {
            cout << "Invalid Option." << endl;
            cin >> e_choice;
        }

        this_en = engines[e_choice-1];
        return this_en;
    }
};

class EngineCC
{
    const static int typeCC = 3;

    int CC[typeCC] = {1000, 1300, 1500};

    int type_choice;
    int this_cc;

public:
    EngineCC()
    {
        type_choice = 0;
        this_cc = 0;
    }

    int getCC() const { return this_cc; }
    int selectEngineCC()
    {
        for (int i = 0; i < typeCC; i++)
        {
            cout << i + 1 << ". " << CC[i] << endl;
        }

        cin >> type_choice;
        while (type_choice < 1 && type_choice > typeCC)
        {
            cout << "Invalid Option." << endl;
            cin >> type_choice;
        }

        this_cc = CC[type_choice-1];
        return this_cc;
    }
};

class Paint
{
    const static int typeP = 3;

    string paint[typeP] = {"Red", "White", "Black"};

    int type_choice;
    string this_paint;

public:
    Paint()
    {
        type_choice = 0;
        this_paint = "";
    }

    string getPaint() const { return this_paint; }
    string selectPaint()
    {
        for (int i = 0; i < typeP; i++)
        {
            cout << i + 1 << ". " << paint[i] << endl;
        }

        cin >> type_choice;
        while (type_choice < 1 && type_choice > typeP)
        {
            cout << "Invalid Option." << endl;
            cin >> type_choice;
        }

        this_paint = paint[type_choice-1];
        return this_paint;
    }
};

class Transimission
{
    const static int typeTr = 2;

    string transimission[typeTr] = {"Auto", "Maual"};

    int type_choice;
    string this_trans;

public:
    Transimission()
    {
        type_choice = 0;
        this_trans = "";
    }

    string getTrans() const { return this_trans; }
    string selectTransmission()
    {
        for (int i = 0; i < typeTr; i++)
        {
            cout << i + 1 << ". " << transimission[i] << endl;
        }

        cin >> type_choice;
        while (type_choice < 1 && type_choice > typeTr)
        {
            cout << "Invalid Option." << endl;
            cin >> type_choice;
        }

        this_trans = transimission[type_choice-1];
        return this_trans;
    }
};

class Features
{
    const static int total_features = 3;
    string FeaturesS[total_features] = {"Cruise Control", "Heated Seats", "Self Driving"};
    vector<string> arr;

public:
    Features() {
        
    }

    string getFeatures() const
    {
        string f = "";
        for (int i = 0; i < arr.size(); i++)
        {
            f += arr[i] + " ";
        }
        return f;
    }
    bool isfeatureExist(string f)
    {
        for (int i = 0; i < arr.size(); i++)
        {
            if (arr[i] == f)
            {
                return true;
            }
        }
        return false;
    }
    void selectFeature()
    {
        int type_choice;
        for (int i = 0; i < total_features; i++)
        {
            cout << i + 1 << ". " << FeaturesS[i] << endl;
        }

        cin >> type_choice;
        while (type_choice < 1 && type_choice > total_features)
        {
            cout << "Invalid Option." << endl;
            cin >> type_choice;
        }

        bool exist = false;
        for (int j = 0; j < arr.size(); j++)
        {
            if (arr.at(j) == FeaturesS[type_choice])
            {
                cout << "Feature already exist!";
                exist = true;
                break;
            }
        }
        if (!exist)
        {
            arr.push_back(FeaturesS[type_choice-1]);
        }
    }
};

class Car
{
    void assemeble()
    {
        cout << "Select Make Model\n";
        mm.selectModel();
        cout << "Select Body Type\n";
        bt.selectType();
        cout << "Select Engine\n";
        en.selectEngine();
        cout << "Select Engine CC\n";
        cc.selectEngineCC();
        cout << "Select Paint\n";
        p.selectPaint();
        cout << "Select Transmission\n";
        tr.selectTransmission();
        cout << "Select Features\n";
        f.selectFeature();
    }

public:
    make_model mm;
    Body_Type bt;
    Engine en;
    EngineCC cc;
    Paint p;
    Transimission tr;
    Features f;
    Car *next;
    Car()
    {
        assemeble();
        next = nullptr;
    };

    void printDetail() const
    {
        cout << "Make Model: " << mm.getMake() << endl;
        cout << "Body Type: " << bt.getType() << endl;
        cout << "Engine: " << en.getEn() << endl;
        cout << "Engine CC: " << cc.getCC() << endl;
        cout << "Paint: " << p.getPaint() << endl;
        cout << "transmission: " << tr.getTrans() << endl;
        cout << "Features" << f.getFeatures() << endl;
    }
};

class Inventory
{
    Car *inventory;

public:
    Inventory()
    {
        inventory = nullptr;
    }

    void addCar()
    {
        if (this->inventory == nullptr)
        {
            this->inventory = new Car();
        }
        else
        {
            Car *newCar = new Car();

            Car* temp = this->inventory;

            while(temp->next != nullptr) {
                temp = temp->next;
            }

            temp->next = newCar;
        }
    }

    void getCar(int pos)
    {
        Car *temp = this->inventory;

        for (int i = 0; i < pos; i++)
        {
            if (temp == nullptr)
            {
                break;
            }
            else
            {
                temp = temp->next;
            }
        }

        if (temp != nullptr)
        {
            temp->printDetail();
        }
    }

    void getAllCars()
    {
        Car *temp = this->inventory;

        while (temp != nullptr)
        {
            temp->printDetail();
            cout << "-------------------\n"
                 << endl;
            temp = temp->next;
        }
    }

    void searchCarByFeatures(string fe)
    {
        Car *temp = this->inventory;

        while (temp != nullptr)
        {
            if (temp->f.isfeatureExist(fe))
            {
                temp->printDetail();
                cout << "-------------------\n"
                     << endl;
            }
            temp = temp->next;
        }
    }

    ~Inventory()
    {
        Car *temp = this->inventory;

        while (temp != nullptr)
        {
            Car *del = temp;
            temp = temp->next;

            delete del;
        }

        this->inventory = nullptr;
    }
};

int main()
{
    Inventory my_inv;

    my_inv.addCar();
    my_inv.addCar();
    my_inv.addCar();

    my_inv.getAllCars();

    my_inv.searchCarByFeatures("Cruise Control");

    return 0;
}