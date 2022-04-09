package lab_2.demo;

import java.util.Collection;
import java.util.List;

public class UsersPage {
    private int pageNumber;
    private int pagesCount;
    private int pageSize;
    private int totalCount;

    private List<Object> users; //TODO: add userEntity class

    public List<Object> getUsers() {
        return users;
    }

    public void setUsers(List<Object> users) {
        this.users = users;
    }

    public UsersPage(int pageNumber, int pagesCount, int pageSize, int totalCount, Collection<Object> users) {
        this.pageNumber = pageNumber;
        this.pagesCount = pagesCount;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
    }

    public void setPageNumber(int pageNumber) {
        this.pageNumber = pageNumber;
    }

    public void setPagesCount(int pagesCount) {
        this.pagesCount = pagesCount;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getPageNumber() {
        return pageNumber;
    }

    public int getPagesCount() {
        return pagesCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }
}
