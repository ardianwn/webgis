#!/usr/bin/env python
# -*- coding: utf-8 -*-

import requests
import json
import os
from bs4 import BeautifulSoup
import pandas as pd
from time import sleep

# Membuat direktori untuk menyimpan data
if not os.path.exists('../src/data/bps'):
    os.makedirs('../src/data/bps')

def get_available_datasets():
    """
    Mendapatkan daftar dataset yang tersedia dari BPS
    """
    print("Mengambil daftar dataset dari BPS...")
    
    # URL untuk mengakses API BPS (ini adalah contoh, perlu disesuaikan)
    url = "https://webapi.bps.go.id/v1/api/list"
    
    try:
        # Simulasi dataset (seharusnya diambil dari API)
        datasets = [
            {"id": "1", "name": "Jumlah Penduduk per Provinsi", "year": "2020"},
            {"id": "2", "name": "Produk Domestik Regional Bruto", "year": "2019"},
            {"id": "3", "name": "Tingkat Pengangguran Terbuka", "year": "2021"},
            {"id": "4", "name": "Indeks Pembangunan Manusia", "year": "2021"},
            {"id": "5", "name": "Persentase Penduduk Miskin", "year": "2021"}
        ]
        
        # Menyimpan daftar dataset
        with open('../src/data/bps/datasets.json', 'w') as f:
            json.dump(datasets, f, indent=2)
        
        print(f"Berhasil mengambil {len(datasets)} dataset.")
        return datasets
    
    except Exception as e:
        print(f"Error: {e}")
        return []

def scrape_geojson_indonesia():
    """
    Mengunduh data GeoJSON untuk peta Indonesia
    """
    print("Mengunduh GeoJSON Indonesia...")
    
    try:
        # GeoJSON peta Indonesia provinsi
        # Ini adalah URL contoh, perlu disesuaikan
        geojson_url = "https://raw.githubusercontent.com/superpikar/indonesia-geojson/master/indonesia.geojson"
        
        response = requests.get(geojson_url)
        if response.status_code == 200:
            # Menyimpan data GeoJSON
            with open('../src/data/indonesia.geojson', 'w', encoding='utf-8') as f:
                f.write(response.text)
            print("Data GeoJSON Indonesia berhasil diunduh.")
        else:
            print(f"Gagal mengunduh GeoJSON: {response.status_code}")
    
    except Exception as e:
        print(f"Error: {e}")

def simulate_data_scraping():
    """
    Simulasi scraping data statistik (karena kita tidak memiliki akses API langsung)
    """
    print("Simulasi scraping data statistik...")
    
    # Contoh data statistik provinsi
    provinces = [
        "Aceh", "Sumatra Utara", "Sumatra Barat", "Riau", "Jambi", "Sumatra Selatan", 
        "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau", 
        "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", 
        "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", 
        "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", 
        "Kalimantan Utara", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", 
        "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku", "Maluku Utara", 
        "Papua Barat", "Papua"
    ]
    
    # Membuat data statistik simulasi
    datasets = get_available_datasets()
    
    for dataset in datasets:
        data = []
        for province in provinces:
            # Simulasi nilai statistik
            import random
            value = round(random.uniform(10, 100), 2)
            
            data.append({
                "province": province,
                "value": value,
                "year": dataset["year"]
            })
        
        # Simpan data ke file CSV
        df = pd.DataFrame(data)
        file_path = f'../src/data/bps/{dataset["id"]}_{dataset["name"].replace(" ", "_").lower()}.csv'
        df.to_csv(file_path, index=False)
        
        print(f"Data untuk dataset {dataset['name']} berhasil disimulasikan.")
        
        # Delay untuk menghindari overload
        sleep(0.5)

if __name__ == "__main__":
    print("Mulai scraping data BPS...")
    
    # Mendapatkan daftar dataset
    datasets = get_available_datasets()
    
    # Mengunduh GeoJSON Indonesia
    scrape_geojson_indonesia()
    
    # Simulasi scraping data statistik
    simulate_data_scraping()
    
    print("Scraping data selesai!") 