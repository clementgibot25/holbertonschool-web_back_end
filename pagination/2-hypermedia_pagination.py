#!/usr/bin/env python3
"""simple pagination"""

import csv
import math
from typing import List


def index_range(page: int, page_size: int) -> tuple:
    """Return a tuple of size two containing a start index and an end index.

    Args:
        page: The page number (1-indexed)
        page_size: Number of items per page

    Returns:
        tuple: (start_index, end_index)
    """
    return ((page - 1) * page_size, page * page_size)


class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Get the cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Finds indexes to paginate and returns the corresponding pages"""
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0

        all_of_data = self.dataset()
        Page_list = []

        """ Check to see if # of entries is larger than dataset """
        the_range = (page * page_size)
        if the_range > len(all_of_data):
            """ Return empty list if yes """
            return Page_list

        """ Between start and end idx create new page and append to list """
        both_indexes = index_range(page, page_size)
        for i in range(both_indexes[0], both_indexes[1]):
            new_page = all_of_data[i]
            Page_list.append(new_page)
        return Page_list

    def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
        """Returns a dictionary containing pagination
            metadata and the dataset page.

        Args:
            page: The page number (1-indexed)
            page_size: Number of items per page

        Returns:
            dict: A dictionary containing:
                - page_size: the length of the returned dataset page
                - page: the current page number
                - data: the dataset page
                - next_page: number of the next page,
                None if no next page
                - prev_page: number of the previous page,
                None if no previous page
                - total_pages: the total number of pages in the dataset
        """
        """ Get the page data using the existing get_page method """
        page_data = self.get_page(page, page_size)
        total_items = len(self.dataset())
        total_pages = math.ceil(total_items / page_size)

        """ Calculate next and previous page numbers """
        next_page = page + 1 if page * page_size < total_items else None
        prev_page = page - 1 if page > 1 else None

        return {
            'page_size': len(page_data),
            'page': page,
            'data': page_data,
            'next_page': next_page,
            'prev_page': prev_page,
            'total_pages': total_pages
        }
